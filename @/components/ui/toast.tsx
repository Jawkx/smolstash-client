import React from "react";
import { BaseToastProps, ToastConfig } from "react-native-toast-message";
import { View, Platform } from "react-native";
import { Text } from "../ui/text";
import { Icon } from "@/lib/icons";

export const toastConfig: ToastConfig = {
	success: ({ text1 }: BaseToastProps) => {
		return (
			<View
				className={`w-full h-12 flex-row ${Platform.OS === "web" ? "justify-end px-8" : "justify-center"}`}
			>
				<View className="h-full w-[90%] max-w-[400] flex-row bg-card border-green-600 border-2 rounded-lg items-center">
					<View className="w-3" />
					<Icon.CircleCheck className="rounded-lg text-green-600" />
					<View className="w-1.5" />
					<Text className="text-green-600">{text1}</Text>
				</View>
			</View>
		);
	},

	error: ({ text1 }: BaseToastProps) => {
		return (
			<View
				className={`w-full h-12 flex-row ${Platform.OS === "web" ? "justify-end px-8" : "justify-center"}`}
			>
				<View className="h-full w-[90%] max-w-[400] flex-row bg-card border-red-600 border-2 rounded-lg items-center">
					<View className="w-3" />
					<Icon.CircleX className="rounded-lg text-red-600" />
					<View className="w-1.5" />
					<Text className="text-red-600">{text1}</Text>
				</View>
			</View>
		);
	},
};
