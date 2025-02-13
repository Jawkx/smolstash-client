import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DefaultTheme, ThemeProvider, Theme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@lib/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform, View } from "react-native";
import { Stack } from "expo-router";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import Toast from "react-native-toast-message";
import { NAV_THEME } from "@lib/constants";
import "../global.css";
import { toastConfig } from "@ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tokenCache } from "../tokenCache";
import { StatusBar } from "expo-status-bar";
import { AccessTokenProvider } from "@/context/accessToken";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const LIGHT_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
	...DefaultTheme,
	colors: NAV_THEME.dark,
};

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
	throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

if (Platform.OS === "web") {
	const localStoragePersister = createSyncStoragePersister({
		storage: window.localStorage,
	});

	persistQueryClient({
		queryClient,
		persister: localStoragePersister,
	});
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { colorScheme, setColorScheme } = useColorScheme();
	const { isColorSchemeLoaded, loaded } = useInit(colorScheme, setColorScheme);

	if (!loaded) {
		return null;
	}

	if (!isColorSchemeLoaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ClerkProvider
				publishableKey={publishableKey as string}
				tokenCache={tokenCache}
			>
				<ClerkLoaded>
					<ThemeProvider
						value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}
					>
						<AccessTokenProvider>
							<StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
							<View className="flex-1 bg-background">
								<Stack screenOptions={{ headerShown: false }}>
									<Stack.Screen name="index" />
									<Stack.Screen name="login" />
									<Stack.Screen name="stash" />
								</Stack>
								<Toast config={toastConfig} position="bottom" />
							</View>
						</AccessTokenProvider>
					</ThemeProvider>
				</ClerkLoaded>
			</ClerkProvider>
		</QueryClientProvider>
	);
}

const useInit = (
	colorScheme: string,
	setColorScheme: (scheme: "light" | "dark") => void,
) => {
	const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	useEffect(() => {
		(async () => {
			const theme = await AsyncStorage.getItem("theme");
			if (Platform.OS === "web") {
				// Adds the background color to the html element to prevent white background on overscroll.
				document.documentElement.classList.add(
					theme === "dark" ? "dark" : "root",
				);
			}
			if (!theme) {
				AsyncStorage.setItem("theme", colorScheme);
				setIsColorSchemeLoaded(true);
				return;
			}
			const colorTheme = theme === "dark" ? "dark" : "light";
			if (colorTheme !== colorScheme) {
				setColorScheme(colorTheme);
				setIsColorSchemeLoaded(true);
				return;
			}
			setIsColorSchemeLoaded(true);
		})().finally(() => {
			SplashScreen.hideAsync();
		});
	}, []);

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	return {
		isColorSchemeLoaded,
		loaded,
	};
};
