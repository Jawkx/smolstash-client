import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, View } from "react-native";
import { LinkButton } from "@/components/ui/button";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
	useSafeAreaFrame,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";

export const StashDrawerContent = ({}: DrawerContentComponentProps) => {
	const frame = useSafeAreaFrame();
	const insets = useSafeAreaInsets();
	const { isSignedIn } = useAuth();
	const defaultHeaderHeight = getDefaultHeaderHeight(frame, false, insets.top);

	const accessToken = useStore((state) => state.accessToken);
	const stashes = useStore((state) => state.stashes);
	const getStashes = useStore((state) => state.getStashes);
	const { isLoading } = useStore((state) => state.stashesLoadState);

	React.useEffect(() => {
		if (isSignedIn && stashes === null && accessToken) {
			getStashes();
		}
	}, [accessToken, stashes, isSignedIn]);

	return (
		<View className="border-border border flex-1">
			<View
				style={{ height: defaultHeaderHeight }}
				className="p-3 justify-end border-border border"
			>
				<Text className="font-bold text-3xl">Comfy Stash</Text>
			</View>

			<View className="h-4" />
			<Text className="text-2xl font-medium px-4">Stashes</Text>
			<View className="h-1" />

			{isLoading ? (
				<ActivityIndicator size="large" />
			) : (
				stashes?.map(({ name, id }) => (
					<LinkButton
						href={`/stash/${id}`}
						key={id}
						variant="ghost"
						className="w-full items-start"
					>
						<Text>{name}</Text>
					</LinkButton>
				))
			)}
		</View>
	);
};
