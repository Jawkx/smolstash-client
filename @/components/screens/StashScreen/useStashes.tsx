import { CoreApi } from "@/api";
import { useAccessToken } from "@/context/accessToken";
import { useAuth } from "@clerk/clerk-expo";
import { useQuery } from "@tanstack/react-query";

export const useStashes = () => {
	const { isSignedIn } = useAuth();

	const { accessToken } = useAccessToken();

	return useQuery({
		queryKey: ["stashes"],
		queryFn: () => {
			if (!accessToken) {
				throw new Error("No access token");
			}

			return CoreApi.getStashes(accessToken);
		},
		enabled: isSignedIn && !!accessToken,
	});
};
