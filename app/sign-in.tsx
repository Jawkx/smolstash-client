import { AnimatedView } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@ui/input";
import React from "react";
import { FadeIn, SlideInDown } from "react-native-reanimated";

const SignInModal = () => {
	const handleReturn = () => {};

	return (
		<AnimatedView
			entering={FadeIn}
			className="flex w-full h-full justify-center items-center bg-black/50"
		>
			<AnimatedView
				entering={SlideInDown}
				className="bg-background p-6 rounded-lg w-[80%] max-w-lg border-primary-foreground border-2 align-center"
			>
				<Input
					className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
					placeholder="Email"
					keyboardType="email-address"
					autoCapitalize="none"
				/>
				<Button onPress={handleReturn}>
					<Text className="font-semibold">Sign in</Text>
				</Button>
			</AnimatedView>
		</AnimatedView>
	);
};

export default SignInModal;
