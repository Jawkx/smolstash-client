import { Stash } from "@/model";
import { LoadState } from "@/model";
import { StateCreator } from "zustand";
import { StoreState } from ".";
import { CoreApi } from "@/api";

export interface StashesSlice {
	stashes: Stash[] | null;
	stashesLoadState: LoadState;
	getStashes: () => void;
}

export const createStashesSlice: StateCreator<
	StoreState,
	[],
	[],
	StashesSlice
> = (set, get) => ({
	stashes: null,
	stashesLoadState: {
		isLoading: false,
		error: null,
	},
	getStashes: async () => {
		const accessToken = get().accessToken;

		if (!accessToken) {
			set({
				stashesLoadState: {
					isLoading: false,
					error: !accessToken ? new Error("yay") : null,
				},
			});
			return;
		}

		set({
			stashesLoadState: {
				isLoading: true,
				error: null,
			},
		});

		const { stashes } = await CoreApi.getStashes(accessToken);

		set({
			stashes: stashes,
			stashesLoadState: { isLoading: false, error: null },
		});
	},
});
