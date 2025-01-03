import { LinkButton } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowUpDown } from "@/lib/icons";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export const StashSelectionHeader = ({ children }: { children: string }) => {
	const { stashId } = useGlobalSearchParams();

	return (
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
			<Text className="text-sm font-semibold">{children}</Text>
			<View className="w-2" />
			<ArrowUpDown size={16} />
		</LinkButton>
	);
};
