import React from "react";
import { Platform, View } from "react-native";
import { Button, LinkButton } from "@ui/button";
import { Text } from "@ui/text";
import { Moon, Sun } from "@lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";

const IndexPage = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe flex-row justify-center items-center h-screen w-screen bg-background">
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

				<Text>In Progress</Text>
			</View>
		</View>
	);
};

export default IndexPage;
