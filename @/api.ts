import { fetch } from "expo/fetch";

const rootUrl = process.env.EXPO_PUBLIC_API_ROOT;

if (!rootUrl) {
	throw new Error("Add EXPO_PUBLIC_ROOT_URL to your .env file");
}

interface GetStashesResponse {
	stashes: {
		DbName: string;
		DbPath: string;
		Id: string;
		Name: string;
		OwnerId: string;
	}[];
}

const getStashes = async (
	getToken: () => Promise<string | null>,
): Promise<GetStashesResponse> => {
	const accessToken = await getToken();

	if (!accessToken) throw new Error("Access Token not present");

	const response = await fetch(rootUrl + "/stashes", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json",
		},
	});

	return await response.json();
};

export const CoreApi = {
	getStashes,
};
