import React from "react";
import { View } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useGlobalSearchParams } from "expo-router";
import { Button, LinkButton } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowLeftRight, Settings } from "@/lib/icons";

export const StashHeader = () => {
	const { stashId } = useGlobalSearchParams();

	return (
		<View className="flex-row justify-between items-center mt-safe py-2">
			<Button variant="ghost">
				<Settings className="text-foreground" />
			</Button>
			<LinkButton
				className="flex-row"
				variant="ghost"
				href={{
					pathname: "/stash/stash-selection",
					params: {
						selected: stashId,
					},
				}}
			>
				<Text className="text-sm font-semibold">Select a stash</Text>
				<View className="w-2" />
				<ArrowLeftRight className="text-foreground" />
			</LinkButton>
			<ThemeToggler />
		</View>
	);
};
