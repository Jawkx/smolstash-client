import { fetch } from "expo/fetch";
import { Stash, StashSchema } from "./model";

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
	return StashSchema.array().parse(data);
};

type GetStashInfoRes = Stash;

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
	return StashSchema.parse(data);
};

export const CoreApi = {
	getStashes,
	getStashInfo,
};
