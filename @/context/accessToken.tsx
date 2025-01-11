import React, { createContext, useContext, useState } from "react";

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
	const [accessToken, setAccessToken] = useState<string | null>(null);

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
