import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export const StashScreen = () => {
	const navigation = useNavigation() as DrawerNavigationProp<any>;
	return (
		<View className="items-center justify-center flex-1">
			<Text className="font-bold text-xl">Select a stash to continue</Text>
			{Platform.OS !== "web" ? (
				<Button
					onPress={() => {
						navigation.openDrawer();
					}}
				>
					<Text>Select a stash</Text>
				</Button>
			) : null}
		</View>
	);
};
