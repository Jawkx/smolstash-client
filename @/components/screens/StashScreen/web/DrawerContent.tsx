import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, FlatList, View } from "react-native";
import { LinkButton } from "@/components/ui/button";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
	useSafeAreaFrame,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useStashes } from "../useStashes";
import { useGlobalSearchParams } from "expo-router";

export type GlobalParam = {
	stashId?: string;
};

export const StashDrawerContent = ({}: DrawerContentComponentProps) => {
	const { stashId } = useGlobalSearchParams<GlobalParam>();

	const frame = useSafeAreaFrame();
	const insets = useSafeAreaInsets();
	const defaultHeaderHeight = getDefaultHeaderHeight(frame, false, insets.top);

	const { stashes, isLoading } = useStashes();

	return (
		<View className="border-border border flex-1">
			<View
				style={{ height: defaultHeaderHeight }}
				className="p-3 justify-end border-border border"
			>
				<Text className="font-bold text-3xl">Comfy Stash</Text>
			</View>

			<View className="h-4" />
			<Text className="text-2xl font-medium px-4">Stashes</Text>
			<View className="h-1" />

			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<FlatList
					data={stashes}
					keyExtractor={(item) => item.id}
					contentContainerClassName="px-2"
					renderItem={({ item: { id, name } }) => (
						<LinkButton
							href={`/stash/${id}`}
							variant="ghost"
							className={`w-full items-start ${id === stashId ? "bg-muted" : ""}`}
						>
							<Text>{name}</Text>
						</LinkButton>
					)}
				/>
			)}
		</View>
	);
};
