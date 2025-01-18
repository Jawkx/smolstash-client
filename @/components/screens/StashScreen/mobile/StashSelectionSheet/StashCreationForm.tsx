import React, { FC, useState } from "react";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { BottomSheet } from "@/components/ui/bottomSheet";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { BottomSheetView } from "@gorhom/bottom-sheet";

export const StashCreationForm = () => {
	const [stashName, setStashName] = useState("");

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			console.log("submit " + stashName);
			return null;
		},
	});

	const handleCreateStash = () => {
		mutate();
	};

	return (
		<BottomSheet.View>
			<Text className="text-muted-foreground text-center">
				Create new stash
			</Text>
			<View className="h-3" />
			<BottomSheet.Input
				placeholder="Stash name"
				value={stashName}
				onChangeText={setStashName}
			/>
			<Button
				className="mt-4"
				variant="secondary"
				onPress={handleCreateStash}
				disabled={isPending}
			>
				<Text>{isPending ? "Creating..." : "Create new stash"}</Text>
			</Button>
		</BottomSheet.View>
	);
};
