import { Button } from "@/components/ui/button";
import React from "react";
import { Platform, View } from "react-native";
import { Moon, Sun } from "@lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";

export const LoginScreenTop = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	return (
		<View className="absolute flex-row justify-end w-screen top-safe-or-4">
			<Button variant="link" onPress={toggleColorScheme}>
				{colorScheme === "dark" ? (
					<Moon className="text-foreground" size={24} />
				) : (
					<Sun className="text-foreground" />
				)}
			</Button>
		</View>
	);
};
