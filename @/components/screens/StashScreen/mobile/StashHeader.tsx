import React from "react";
import { View } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowLeftRight, Settings } from "@/lib/icons";

interface StashHeaderProps {
	handleOpenSelectionSheet: () => void;
}

export const StashHeader = ({ handleOpenSelectionSheet }: StashHeaderProps) => {
	return (
		<View className="flex-row justify-between items-center mt-safe py-2">
			<Button variant="ghost">
				<Settings className="text-foreground" />
			</Button>
			<Button
				className="flex-row"
				variant="ghost"
				onPress={handleOpenSelectionSheet}
			>
				<Text className="text-sm font-semibold">Select a stash</Text>
				<View className="w-2" />
				<ArrowLeftRight className="text-foreground" />
			</Button>
			<ThemeToggler />
		</View>
	);
};
