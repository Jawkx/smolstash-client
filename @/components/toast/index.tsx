import React from "react";
import {
	BaseToast,
	BaseToastProps,
	ToastConfig,
} from "react-native-toast-message";
import { View, Platform } from "react-native";
import { Text } from "../ui/text";

export const toastConfig: ToastConfig = {
	success: ({ text1 }: BaseToastProps) => {
		return (
			<View
				className={`w-full h-12 flex-row ${Platform.OS === "web" ? "justify-end px-8" : "justify-center"}`}
			>
				<View className="h-full w-[90%] max-w-[400] bg-card rounded-lg border-emerald-600 border-2 flex-row items-center">
					<View className="w-3" />
					<View className="w-2 h-[60%] rounded-lg bg-emerald-600" />
					<View className="w-1.5" />
					<Text>{text1}</Text>
				</View>
			</View>
		);
	},
};
