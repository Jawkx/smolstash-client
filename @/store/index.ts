import { create } from "zustand";
import { StashesSlice } from "./stashes";
import { createStashesSlice } from "./stashes";
import { AuthSlice, createAuthSlice } from "./auth";

export type StoreState = StashesSlice & AuthSlice;

export const useStore = create<StoreState>((...a) => ({
	...createAuthSlice(...a),
	...createStashesSlice(...a),
}));
