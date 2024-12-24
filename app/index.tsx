import React from "react";
import { Platform, View } from "react-native";
import { Button, LinkButton } from "@ui/button";
import { Text } from "@ui/text";
import { Moon, Sun } from "@lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";
import Toast from "react-native-toast-message";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const IndexPage = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href="/stash" />;
	}

	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe justify-center items-center h-screen w-screen bg-background">
				<View
					className={`absolute top-6 flex-row w-full px-6 ${Platform.OS === "web" ? "justify-end gap-2" : "justify-between"}`}
				>
					<LinkButton href="/login">
						<Text className="font-semibold">Sign Up / Login</Text>
					</LinkButton>

					<Button variant="link" onPress={toggleColorScheme}>
						{colorScheme === "dark" ? (
							<Moon className="text-foreground" />
						) : (
							<Sun className="text-foreground" />
						)}
					</Button>
				</View>
			</View>
		</View>
	);
};

export default IndexPage;
