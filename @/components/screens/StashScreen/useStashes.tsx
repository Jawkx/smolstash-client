import { useStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import React from "react";

export const useStashes = () => {
	const { isSignedIn } = useAuth();

	const accessToken = useStore((state) => state.accessToken);
	const stashes = useStore((state) => state.stashes);
	const getStashes = useStore((state) => state.getStashes);
	const { isLoading } = useStore((state) => state.stashesLoadState);

	React.useEffect(() => {
		if (isSignedIn && !stashes && accessToken) {
			getStashes();
		}
	}, [accessToken, stashes, isSignedIn]);

	return {
		stashes,
		isLoading,
		getStashes,
	};
};
