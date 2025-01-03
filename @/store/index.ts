import { create } from "zustand";
import { StashesSlice } from "./stashes";
import { createStashesSlice } from "./stashes";
import { AuthSlice, createAuthSlice } from "./auth";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StoreState = StashesSlice & AuthSlice;

export const useStore = create<StoreState>()(
	persist(
		(...a) => ({
			...createAuthSlice(...a),
			...createStashesSlice(...a),
		}),
		{
			name: "storage",
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (state) => ({ stashes: state.stashes }),
		},
	),
);
