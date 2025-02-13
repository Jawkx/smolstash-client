import { Button } from "@/components/ui/button";
import React from "react";
import { View } from "react-native";
import { Icon } from "@lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";

export const LoginScreenTop = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	return (
		<View className="absolute flex-row justify-end w-screen top-safe-or-4">
			<Button variant="link" onPress={toggleColorScheme}>
				{colorScheme === "dark" ? (
					<Icon.Moon className="text-foreground" size={24} />
				) : (
					<Icon.Sun className="text-foreground" />
				)}
			</Button>
		</View>
	);
};
