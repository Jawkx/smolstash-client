import { fetch } from "expo/fetch";
import { Stash } from "./model";

const rootUrl = process.env.EXPO_PUBLIC_API_ROOT;

if (!rootUrl) {
	throw new Error("Add EXPO_PUBLIC_ROOT_URL to your .env file");
}

interface GetStashesResponse {
	stashes: Stash[];
}

const getStashes = async (accessToken: string): Promise<GetStashesResponse> => {
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
