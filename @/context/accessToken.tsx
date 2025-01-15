import { useAuth } from "@clerk/clerk-expo";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type AccessTokenContextType = {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
};

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(
	undefined,
);

export const AccessTokenProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { getToken, isSignedIn } = useAuth();
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [expiryTimestamp, setExpiryTimestamp] = useState<number | null>(null);

	const refreshToken = async () => {
		const token = await getToken();
		if (token) {
			try {
				const decoded = jwtDecode(token);

				if (decoded?.exp) {
					setExpiryTimestamp(decoded.exp * 1000);
					setAccessToken(token);
				}
			} catch (e) {
				console.log(e);
			}
		}
	};

	useEffect(() => {
		if (isSignedIn) {
			const now = Date.now();
			if (!accessToken || (expiryTimestamp && now >= expiryTimestamp)) {
				refreshToken();
			}
		}
	}, [accessToken, isSignedIn, expiryTimestamp]);

	useEffect(() => {
		if (expiryTimestamp) {
			const timeUntilExpiry = expiryTimestamp - Date.now();
			if (timeUntilExpiry > 0) {
				const timeout = setTimeout(() => {
					refreshToken();
				}, timeUntilExpiry);
				return () => clearTimeout(timeout);
			}
		}
	}, [expiryTimestamp]);

	return (
		<AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
			{children}
		</AccessTokenContext.Provider>
	);
};

export const useAccessToken = () => {
	const context = useContext(AccessTokenContext);
	if (!context) {
		throw new Error(
			"useAccessToken must be used within an AccessTokenProvider",
		);
	}
	return context;
};
