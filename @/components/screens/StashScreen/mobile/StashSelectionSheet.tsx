import React from "react";
import { BottomSheet } from "@/components/ui/bottomSheet";
// use only as type ref
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stash } from "@/model";
import { useStashes } from "../useStashes";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from "@/lib/icons";
import { ActivityIndicator, FlatList, ListRenderItem } from "react-native";
import { useColorScheme } from "@/lib/useColorScheme";

interface StashSelectionModalProps {
	handleDismissModal: () => void;
}

export const StashSelectionModalSheet = React.forwardRef<
	BottomSheetModal,
	StashSelectionModalProps
>(({ handleDismissModal }, ref) => {
	const { themeColors } = useColorScheme();
	const { stashId: selectedStashId } = useGlobalSearchParams();
	const { data: stashes, isLoading } = useStashes();
	const router = useRouter();

	const snapPoints = React.useMemo(() => ["50%"], []);

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
		<BottomSheet.Modal
			ref={ref}
			snapPoints={snapPoints}
			index={0}
			enableDynamicSizing={false}
			keyboardBehavior="interactive"
			android_keyboardInputMode="adjustResize"
		>
			<BottomSheet.View className="flex-1 bg-background mb-safe pt-5 pb-1 px-4">
				<Text className="text-muted-foreground font-medium text-center">
					Select a stash
				</Text>

				{isLoading ? (
					<ActivityIndicator
						size="large"
						className="flex-1"
						color={themeColors.primary}
					/>
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
		</BottomSheet.Modal>
	);
});

StashSelectionModalSheet.displayName = "stash_selection_modal";
