import { useColorScheme } from "@/lib/useColorScheme";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProps,
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import React from "react";
import { StyleSheet } from "react-native";

const Backdrop = (props: BottomSheetBackdropProps) => {
	return (
		<BottomSheetBackdrop
			{...props}
			pressBehavior="close"
			opacity={0.7}
			appearsOnIndex={0}
			disappearsOnIndex={-1}
		/>
	);
};

const Modal = React.forwardRef<BottomSheetModal, BottomSheetModalProps>(
	(props, ref) => {
		const { colorScheme } = useColorScheme();
		const isLightTheme = colorScheme === "light";

		return (
			<BottomSheetModal
				{...props}
				backdropComponent={Backdrop}
				enableDynamicSizing={false}
				ref={ref}
				backgroundStyle={
					isLightTheme ? styles.backgroundLight : styles.backgroundDark
				}
				handleIndicatorStyle={
					isLightTheme ? styles.indicatorLight : styles.indicatorDark
				}
			/>
		);
	},
);

Modal.displayName = "StyledBottomSheetModal";

export const BottomSheet = {
	Modal,
	Backdrop,
	View: BottomSheetView,
};

const styles = StyleSheet.create({
	indicatorDark: {
		backgroundColor: "hsl(0 0% 100%)",
	},
	indicatorLight: {
		backgroundColor: "hsl(240 10% 3.9%)",
	},
	backgroundLight: {
		backgroundColor: "hsl(0 0% 100%)",
	},
	backgroundDark: {
		backgroundColor: "hsl(240 10% 3.9%)",
	},
});
