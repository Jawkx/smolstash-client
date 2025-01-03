import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export const EmptyStashScreen = () => {
	const navigation = useNavigation();

	return (
		<View className="items-center justify-center flex-1">
			<Text className="font-bold text-xl">Select a stash to continue</Text>
			<Button>
				<Text>Select a stash</Text>
			</Button>
		</View>
	);
};
