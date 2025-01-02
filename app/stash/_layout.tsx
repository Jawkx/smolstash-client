import React from "react";
import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";
import { StashDrawerContent } from "@/components/screens/StashScreen/DrawerContent";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useAuth } from "@clerk/clerk-expo";
import { useStore } from "@/store";

const StashLayout = () => {
	const { getToken } = useAuth();
	const setAccessToken = useStore((state) => state.setAccesstoken);

	React.useEffect(() => {
		getToken().then((token) => {
			if (token) setAccessToken(token);
		});
	}, []);

	return (
		<Drawer
			drawerContent={StashDrawerContent}
			screenOptions={{
				headerRight: ThemeToggler,
				headerLeft: Platform.OS === "web" ? () => null : undefined,
				headerTitle: "",
				drawerType: Platform.OS === "web" ? "permanent" : "front",
			}}
		>
			<Drawer.Screen name="index" />
		</Drawer>
	);
};

export default StashLayout;
