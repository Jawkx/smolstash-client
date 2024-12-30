import { Button } from "@/components/ui/button";
import React from "react";
import { Moon, Sun } from "@lib/icons";

import { useColorScheme } from "@/lib/useColorScheme";

export const ThemeToggler = () => {
	const { toggleColorScheme, colorScheme } = useColorScheme();
	return (
		<Button variant="link" onPress={toggleColorScheme}>
			{colorScheme === "dark" ? (
				<Moon className="text-foreground" size={24} />
			) : (
				<Sun className="text-foreground" />
			)}
		</Button>
	);
};
