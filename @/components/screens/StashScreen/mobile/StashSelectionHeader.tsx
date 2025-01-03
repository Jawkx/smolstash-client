import { LinkButton } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowUpDown } from "@/lib/icons";
import React from "react";
import { View } from "react-native";

export const StashSelectionHeader = ({ children }: { children: string }) => {
	return (
		<LinkButton
			className="flex-row"
			variant="ghost"
			href="/stash/stash-selection"
		>
			<Text className="text-sm font-semibold">{children}</Text>
			<View className="w-2" />
			<ArrowUpDown size={16} />
		</LinkButton>
	);
};
