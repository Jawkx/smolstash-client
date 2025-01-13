import { Button } from "@/components/ui/button";
import React from "react";
import { View } from "react-native";
import { Icon } from "@lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";

export const LoginScreenTop = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();

	return (
		<View className="absolute flex-row justify-end w-screen top-4 right-4">
			<Button variant="ghost" onPress={toggleColorScheme} size="icon">
				{colorScheme === "dark" ? (
					<Icon.Moon className="text-foreground" size={32} />
				) : (
					<Icon.Sun className="text-foreground" size={32} />
				)}
			</Button>
		</View>
	);
};
