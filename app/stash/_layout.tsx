import React from "react";
import { Drawer } from "expo-router/drawer";
import { Platform } from "react-native";
import { StashDrawerContent } from "@/components/screens/StashScreen/DrawerContent";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";

const StashLayout = () => {
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
