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
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "@/components/ui/text";
import { BottomSheet } from "@/components/ui/bottomSheet";
import { StashSelectionModalSheet } from "@/components/screens/StashScreen/mobile/StashSelectionSheet";

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
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

	// callbacks
	const handlePresentModalPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleDismissModal = React.useCallback(() => {
		bottomSheetModalRef.current?.close();
	}, []);

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
						}}
					/>
				</Stack>
				<StashSelectionModalSheet
					ref={bottomSheetModalRef}
					handleDismissModal={handleDismissModal}
					selectedStashId={null}
				/>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};
