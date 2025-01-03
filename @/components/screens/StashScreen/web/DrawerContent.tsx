import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, FlatList, View } from "react-native";
import { Button, LinkButton } from "@/components/ui/button";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
	useSafeAreaFrame,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useStashes } from "../useStashes";
import { useGlobalSearchParams } from "expo-router";
import { Plus } from "@/lib/icons";

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

			<View className="flex-row justify-between items-center px-4">
				<Text>Stashes</Text>
			</View>

			<View className="h-1" />

			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				<>
					<View className="px-2">
						<FlatList
							data={stashes}
							keyExtractor={(item) => item.id}
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
					</View>

					<View className="h-2" />

					<View className="items-end px-2">
						<Button variant="outline" size="sm" className="flex-row">
							<Text className="pr-1.5">Add Stash</Text>
							<Plus className="text-primary" size={20} />
						</Button>
					</View>
				</>
			)}
		</View>
	);
};
