import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProps,
	BottomSheetBackdrop,
	BottomSheetBackdropProps,
	BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, TextInputProps } from "react-native";

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
		const { themeColors } = useColorScheme();

		const backgroundColor = themeColors.background;

		return (
			<BottomSheetModal
				{...props}
				backdropComponent={Backdrop}
				ref={ref}
				backgroundStyle={{
					backgroundColor: backgroundColor,
				}}
				handleIndicatorStyle={{ backgroundColor: themeColors.foreground }}
			/>
		);
	},
);

Modal.displayName = BottomSheetModal.name;

const Input = React.forwardRef<
	React.ElementRef<typeof BottomSheetTextInput>,
	TextInputProps
>(({ className, placeholderClassName, ...props }, ref) => {
	return (
		<BottomSheetTextInput
			ref={ref}
			className={cn(
				"web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
				props.editable === false && "opacity-50 web:cursor-not-allowed",
				className,
			)}
			placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
			{...props}
		/>
	);
});

Input.displayName = BottomSheetTextInput.name;

export const BottomSheet = {
	Modal,
	Backdrop,
	View: BottomSheetView,
	Input,
};
