import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const Stash = () => {
	const { userId, signOut } = useAuth();
	const router = useRouter();

	const handleSignOut = () => {
		router.navigate("/");
		signOut();
	};

	return (
		<View className="w-full h-full">
			<Text>Work In Progress</Text>
			<Button onPress={handleSignOut}>
				<Text>Log out</Text>
			</Button>
		</View>
	);
};

export default Stash;
