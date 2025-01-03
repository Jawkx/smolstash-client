import React from "react";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Platform } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useAuth } from "@clerk/clerk-expo";
import { useStore } from "@/store";
import { Stack } from "expo-router";
import { StashSelectionHeader } from "@/components/screens/StashScreen/mobile/StashSelectionHeader";
import { StashDrawerContent } from "@/components/screens/StashScreen/web/DrawerContent";

const StashLayout = () => {
	const { getToken, isSignedIn } = useAuth();
	const accessToken = useStore((state) => state.accessToken);
	const setAccessToken = useStore((state) => state.setAccesstoken);

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

	return Platform.OS === "web" ? <StashLayoutWeb /> : <StashLayoutMobile />;
};

export default StashLayout;

const StashLayoutWeb = () => {
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

const StashLayoutMobile = () => {
	return (
		<Stack screenOptions={{ headerRight: ThemeToggler }}>
			<Stack.Screen
				name="index"
				options={{
					headerTitle: () => (
						<StashSelectionHeader>Select a stash</StashSelectionHeader>
					),
				}}
			/>
			<Stack.Screen
				name="[stashId]"
				options={{ presentation: "card", headerTitle: StashSelectionHeader }}
			/>
			<Stack.Screen
				name="stash-selection"
				options={{ presentation: "fullScreenModal", headerShown: false }}
			/>
		</Stack>
	);
};
