import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icons";
import { useStashInfo } from "../useStashInfo";
import { useUrlParams } from "../useUrlParam";

interface StashHeaderProps {
	handleOpenSelectionSheet: () => void;
}

export const StashHeader = ({ handleOpenSelectionSheet }: StashHeaderProps) => {
	const { stashId } = useUrlParams();

	const { data: stashInfo, isLoading, isError, error } = useStashInfo(stashId);

	return (
		<View className="flex-row justify-between items-center mt-safe py-2">
			<Button variant="ghost">
				<Icon.Settings className="text-foreground" />
			</Button>

			<Button
				className="flex-row items-center"
				variant="ghost"
				size="lg"
				onPress={handleOpenSelectionSheet}
			>
				{!stashId ? (
					<Text className="text-sm text-muted-foreground font-semibold">
						Select a stash
					</Text>
				) : isLoading ? (
					<ActivityIndicator className="text-foreground" />
				) : (
					<Text className="text-lg text-foreground font-semibold">
						{stashInfo?.name}
					</Text>
				)}

				<View className="w-2" />

				<Icon.ChevronDown className="text-foreground" />
			</Button>
			<ThemeToggler />
		</View>
	);
};
