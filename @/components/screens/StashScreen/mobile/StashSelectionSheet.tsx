import React from "react";
import {
	ActivityIndicator,
	FlatList,
	ListRenderItem,
	View,
} from "react-native";
import { useStashes } from "../useStashes";
import { Stash } from "@/model";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { BottomSheet } from "@/components/ui/bottomSheet";
// use only as ref
import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface StashSelectionModalProps {
	selectedStashId: string | null;
	handleDismissModal: () => void;
}

export const StashSelectionModalSheet = React.forwardRef<
	BottomSheetModal,
	StashSelectionModalProps
>(({ selectedStashId, handleDismissModal }, ref) => {
	const { data: stashes, isLoading } = useStashes();
	const router = useRouter();

	const renderStashItem: ListRenderItem<Stash> = ({ item }) => {
		const { name, id } = item;

		const handlePressItem = () => {
			router.replace(`/stash/${id}`);
			handleDismissModal();
		};

		return (
			<Button
				variant="ghost"
				onPress={handlePressItem}
				className={`flex-row items-center justify-between w-full ${id === selectedStashId ? "bg-muted" : ""}`}
			>
				<Text>{name}</Text>
			</Button>
		);
	};

	return (
		<BottomSheet.Modal ref={ref} snapPoints={["50%"]}>
			<BottomSheet.View className="flex-1 bg-background pt-4 pb-safe-or-4">
				<Text className="font-semibold text-xl text-center">
					Select a stash
				</Text>

				{isLoading ? (
					<ActivityIndicator size="large" className="flex-1" />
				) : (
					<View className="flex-1 px-4">
						<FlatList<Stash>
							data={stashes}
							renderItem={renderStashItem}
							className="w-full"
						/>
						<Button className="mt-4">
							<Text>Create new stash</Text>
						</Button>
					</View>
				)}
			</BottomSheet.View>
		</BottomSheet.Modal>
	);
});

StashSelectionModalSheet.displayName = "heh";
