import React from "react";
import { Drawer } from "expo-router/drawer";
import { ActivityIndicator, Platform } from "react-native";
import { ThemeToggler } from "@/components/reusable/ThemeToggler";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StashDrawerContent } from "@/components/screens/StashScreen/web/DrawerContent";
import { StashHeader } from "@/components/screens/StashScreen/mobile/StashHeader";
import { useAccessToken } from "@/context/accessToken";
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StashSelectionModalSheet } from "@/components/screens/StashScreen/mobile/StashSelectionSheet";

const StashLayout = () => {
	const { isSignedIn } = useAuth();

	const { accessToken } = useAccessToken();

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
	const [isAddingStash, setIsAddingStash] = React.useState(false);

	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

	const handlePresentModalPress = React.useCallback(() => {
		setIsAddingStash(false);
		bottomSheetModalRef.current?.present();
	}, []);

	const handleDismissModal = React.useCallback(() => {
		setIsAddingStash(false);
		bottomSheetModalRef.current?.close();
	}, []);

	const handleAddingStash = () => {
		setIsAddingStash(true);
	};

	return (
		<GestureHandlerRootView>
			<BottomSheetModalProvider>
				<Stack screenOptions={{ headerRight: ThemeToggler }}>
					<Stack.Screen
						name="index"
						options={{
							header: () => (
								<StashHeader
									handleOpenSelectionSheet={handlePresentModalPress}
								/>
							),
						}}
					/>
					<Stack.Screen
						name="[stashId]"
						options={{
							header: () => (
								<StashHeader
									handleOpenSelectionSheet={handlePresentModalPress}
								/>
							),
							animation: "fade_from_bottom",
						}}
					/>
				</Stack>
				<StashSelectionModalSheet
					ref={bottomSheetModalRef}
					handleAddingStash={handleAddingStash}
					handleDismissModal={handleDismissModal}
					isAddingStash={isAddingStash}
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};
