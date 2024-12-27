import { Text } from "@/components/ui/text";
import React from "react";
import { Pressable, TextInput, View } from "react-native";

const CODE_LENGTH = 6;

interface CodeInputProps {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
}

interface CodeInputProps {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
}

export const CodeInput = ({ code, setCode }: CodeInputProps) => {
	const ref = React.useRef<TextInput>(null);

	const handleOnPress = () => {
		ref.current?.focus();
	};

	return (
		<Pressable onPress={handleOnPress}>
			<TextInput
				ref={ref}
				value={code}
				autoFocus={true}
				onChangeText={setCode}
				keyboardType="number-pad"
				returnKeyType="done"
				textContentType="oneTimeCode"
				maxLength={CODE_LENGTH}
				className="absolute w-0 h-0 opacity-0"
			/>

			<View className="flex-row gap-2 justify-center">
				{[...Array(CODE_LENGTH)].map((_, index) => (
					<View
						key={index}
						className={`flex-1 h-16 w-max-[20px] border-2 rounded-lg items-center justify-center ${
							code.length === index ? "border-primary" : "border-border"
						}`}
					>
						<Text className="text-xl font-bold">{code[index] || ""}</Text>
					</View>
				))}
			</View>
		</Pressable>
	);
};
