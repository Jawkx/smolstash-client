import { fetch, FetchRequestInit } from "expo/fetch";
import { Stash } from "./model";

const rootUrl = process.env.EXPO_PUBLIC_API_ROOT;

if (!rootUrl) {
	throw new Error("Add EXPO_PUBLIC_ROOT_URL to your .env file");
}

type GetStashesResponse = Stash[];

const getStashes = async (accessToken: string): Promise<GetStashesResponse> => {
	const response = await fetch(rootUrl + "/stashes", {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	if (!data) {
		throw new Error("Invalid response format");
	}

	return data;
};

interface GetStashInfoRes {
	stashInfo: Stash;
}

const getStashInfo = async (
	accessToken: string,
	stashId: string,
): Promise<GetStashInfoRes> => {
	const response = await fetch(rootUrl + `/stash/${stashId}/info`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const data = await response.json();
	if (!data || !data.stashInfo) {
		throw new Error("Invalid response format");
	}

	return data;
};

export const CoreApi = {
	getStashes,
	getStashInfo,
};
