import React from "react";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { useStashes } from "../../useStashes";
import { Stash } from "@/model";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { BottomSheet } from "@/components/ui/bottomSheet";
import { Icon } from "@/lib/icons";

interface StashSelectionListProps {
	handleDismissModal: () => void;
}

export const StashSelectionList = ({
	handleDismissModal,
}: StashSelectionListProps) => {
	const { stashId: selectedStashId } = useGlobalSearchParams();
	const { data: stashes, isLoading } = useStashes();
	const router = useRouter();

	const renderStashItem: ListRenderItem<Stash> = ({ item }) => {
		const { name, id } = item;

		const handlePressItem = () => {
			if (id !== selectedStashId) {
				router.replace(`/stash/${id}`);
			}
			handleDismissModal();
		};

		return (
			<Button
				variant="ghost"
				onPress={handlePressItem}
				className={`flex-row items-center justify-between w-full ${id === selectedStashId ? "bg-muted" : ""}`}
			>
				<Text className="font-semibold">{name}</Text>

				{id === selectedStashId ? (
					<Icon.CircleCheck className="color-foreground" />
				) : null}
			</Button>
		);
	};

	return (
		<BottomSheet.View className="flex-1">
			<Text className="text-muted-foreground font-semibold text-center">
				Select a stash
			</Text>

			{isLoading ? (
				<ActivityIndicator size="large" className="flex-1" />
			) : (
				<BottomSheet.View className="flex-1  py-4">
					<FlatList<Stash>
						data={stashes}
						renderItem={renderStashItem}
						className="w-full"
					/>
				</BottomSheet.View>
			)}
		</BottomSheet.View>
	);
};
