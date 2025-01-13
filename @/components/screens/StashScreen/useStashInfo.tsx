import { CoreApi } from "@/api";
import { useAccessToken } from "@/context/accessToken";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export const useStashInfo = (stashId?: string) => {
	const { isSignedIn } = useAuth();
	const { accessToken } = useAccessToken();

	return useQuery({
		queryKey: ["stashInfo", stashId],
		queryFn: () => {
			if (!accessToken || !stashId) {
				throw new Error("No access token");
			}

			return CoreApi.getStashInfo(accessToken, stashId);
		},
		enabled: isSignedIn && !!accessToken && !!stashId,
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
	});
};
