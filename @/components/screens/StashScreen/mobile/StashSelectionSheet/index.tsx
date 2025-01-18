import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { BottomSheet } from "@/components/ui/bottomSheet";
// use only as type ref
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StashSelectionList } from "./StashesSelectionList";
import { StashCreationForm } from "./StashCreationForm";

interface StashSelectionModalProps {
	handleDismissModal: () => void;
	handleAddingStash: () => void;
	isAddingStash: boolean;
}

export const StashSelectionModalSheet = React.forwardRef<
	BottomSheetModal,
	StashSelectionModalProps
>(({ handleDismissModal, isAddingStash, handleAddingStash }, ref) => {
	const snapPoints = React.useMemo(() => ["25%", "50%"], []);

	React.useEffect(() => {
		if (isAddingStash) {
		}
	}, []);

	return (
		<BottomSheet.Modal
			ref={ref}
			snapPoints={snapPoints}
			index={1}
			enableDynamicSizing={false}
			keyboardBehavior="interactive"
			android_keyboardInputMode="adjustResize"
		>
			<BottomSheet.View className="flex-1 bg-background mb-safe pt-5 pb-1 px-4">
				{!isAddingStash ? (
					<>
						<StashSelectionList handleDismissModal={handleDismissModal} />
						<Button
							className="mt-4"
							variant="secondary"
							onPress={handleAddingStash}
						>
							<Text>Create new stash</Text>
						</Button>
					</>
				) : (
					<StashCreationForm />
				)}

				<View className="h-4" />
			</BottomSheet.View>
		</BottomSheet.Modal>
	);
});

StashSelectionModalSheet.displayName = "stash_selection_modal";
