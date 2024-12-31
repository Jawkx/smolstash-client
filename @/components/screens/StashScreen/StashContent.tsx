import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";

export const StashContent = () => {
	const { stashId } = useLocalSearchParams();

	return (
		<View>
			<Text>{stashId}</Text>
		</View>
	);
};
