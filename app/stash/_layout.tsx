import React from "react";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Platform } from "react-native";
import { StashDrawerContent } from "@/components/screens/StashScreen/DrawerContent";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useAuth } from "@clerk/clerk-expo";
import { useStore } from "@/store";
import { Stack } from "expo-router";

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
			<Drawer.Screen name="[stashId].tsx" />
		</Drawer>
	);
};

const StashLayoutMobile = () => {
	return (
		<Stack screenOptions={{ headerTitle: "", headerRight: ThemeToggler }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="[stashId].tsx" />
		</Stack>
	);
};
