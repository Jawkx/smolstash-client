import { useGlobalSearchParams } from "expo-router";

export type StashScreenGlobalParams = {
	stashId?: string;
};

export const useUrlParams = () =>
	useGlobalSearchParams<StashScreenGlobalParams>();
