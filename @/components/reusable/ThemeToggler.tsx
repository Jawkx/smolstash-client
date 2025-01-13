import { Button } from "@/components/ui/button";
import React from "react";
import { Icon } from "@lib/icons";

import { useColorScheme } from "@/lib/useColorScheme";

export const ThemeToggler = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();
	return (
		<Button variant="link" onPress={toggleColorScheme}>
			{colorScheme === "dark" ? (
				<Icon.Moon className="text-foreground" />
			) : (
				<Icon.Sun className="text-foreground" />
			)}
		</Button>
	);
};
