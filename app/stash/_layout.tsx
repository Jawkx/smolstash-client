import React from "react";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Platform } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StashDrawerContent } from "@/components/screens/StashScreen/web/DrawerContent";
import { StashHeader } from "@/components/screens/StashScreen/mobile/StashHeader";
import { useAccessToken } from "@/context/accessToken";

const StashLayout = () => {
	const { getToken, isSignedIn } = useAuth();

	const { accessToken, setAccessToken } = useAccessToken();

	React.useEffect(() => {
		if (isSignedIn) {
			getToken().then((token) => {
				if (token) setAccessToken(token);
			});
		}
	}, []);

	if (isSignedIn && !accessToken) {
		return <ActivityIndicator size="large" />;
	}

	return Platform.OS === "web" ? (
		<StashNavigatorWeb />
	) : (
		<StashNavigatorMobile />
	);
};

export default StashLayout;

const StashNavigatorWeb = () => {
	return (
		<Drawer
			drawerContent={StashDrawerContent}
			screenOptions={{
				headerRight: ThemeToggler,
				headerLeft: () => null,
				headerTitle: "",
				drawerType: "permanent",
			}}
		>
			<Drawer.Screen name="index" />
			<Drawer.Screen name="[stashId]" />
		</Drawer>
	);
};

const StashNavigatorMobile = () => {
	return (
		<Stack screenOptions={{ headerRight: ThemeToggler }}>
			<Stack.Screen
				name="index"
				options={{
					header: StashHeader,
				}}
			/>
			<Stack.Screen name="[stashId]" options={{ presentation: "card" }} />
			<Stack.Screen
				name="stash-selection"
				options={{ presentation: "fullScreenModal", headerShown: true }}
			/>
		</Stack>
	);
};
