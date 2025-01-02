import { StateCreator } from "zustand";
import { StoreState } from ".";

export interface AuthSlice {
	accessToken: string | null;
	setAccesstoken: (token: string) => void;
}

export const createAuthSlice: StateCreator<StoreState, [], [], AuthSlice> = (
	set,
) => ({
	accessToken: null,
	setAccesstoken: (token) => {
		set({ accessToken: token });
	},
});
