import React from "react";
import {
	DrawerContentScrollView,
	DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Text } from "@/components/ui/text";
import { ActivityIndicator, View } from "react-native";
import { LinkButton } from "@/components/ui/button";
import { getDefaultHeaderHeight } from "@react-navigation/elements";
import {
	useSafeAreaFrame,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { CoreApi } from "@/api";

export const StashDrawerContent = ({}: DrawerContentComponentProps) => {
	const frame = useSafeAreaFrame();
	const insets = useSafeAreaInsets();
	const defaultHeaderHeight = getDefaultHeaderHeight(frame, false, insets.top);

	const { getToken } = useAuth();

	const { isPending, error, data, isFetching } = useQuery({
		queryKey: ["stashes"],
		queryFn: () => CoreApi.getStashes(getToken),
	});

	return (
		<DrawerContentScrollView contentContainerStyle={{ padding: 0 }}>
			<View
				style={{ height: defaultHeaderHeight }}
				className="justify-end border-border border"
			></View>

			<View className="h-4" />
			<Text className="text-2xl font-bold px-4">Stashes</Text>
			<View className="h-1" />

			{isPending || isFetching ? (
				<ActivityIndicator size="large" />
			) : (
				data?.stashes.map(({ Name, Id }) => (
					<LinkButton
						href="/stash"
						key={Id}
						variant="ghost"
						className="w-full items-start"
					>
						<Text>{Name}</Text>
					</LinkButton>
				))
			)}
		</DrawerContentScrollView>
	);
};
