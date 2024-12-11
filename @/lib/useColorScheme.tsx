import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme() {
	const { colorScheme, setColorScheme, toggleColorScheme } =
		useNativewindColorScheme();

	const toggleColorSchemeInAsyncStorage = () => {
		const isLightScheme = colorScheme === "light";
		if (isLightScheme) {
			AsyncStorage.setItem("theme", "dark");
		} else {
			AsyncStorage.setItem("theme", "light");
		}

		document.documentElement.classList.replace(
			isLightScheme ? "root" : "dark-root",
			isLightScheme ? "dark-root" : "root",
		);

		toggleColorScheme();
	};

	return {
		colorScheme: colorScheme ?? "dark",
		isDarkColorScheme: colorScheme === "dark",
		setColorScheme,
		toggleColorScheme: toggleColorSchemeInAsyncStorage,
	};
}
