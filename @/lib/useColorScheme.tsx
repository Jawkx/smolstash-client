import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import colors from "./colors.json";

export function useColorScheme() {
	const { colorScheme, setColorScheme, toggleColorScheme } =
		useNativewindColorScheme();

	const themeColors = colorScheme === "dark" ? colors.dark : colors.light;

	const toggleColorSchemeInAsyncStorage = () => {
		const isLightScheme = colorScheme === "light";
		if (isLightScheme) {
			AsyncStorage.setItem("theme", "dark");
		} else {
			AsyncStorage.setItem("theme", "light");
		}
		toggleColorScheme();
	};

	return {
		colorScheme: colorScheme ?? "dark",
		isDarkColorScheme: colorScheme === "dark",
		themeColors,
		setColorScheme,
		toggleColorScheme: toggleColorSchemeInAsyncStorage,
	};
}
