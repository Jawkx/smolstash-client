import React from "react";
import { AnimatedView } from "@/components/ui/animated";
import { Link, router, useLocalSearchParams, useRouter } from "expo-router";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pressable, StyleSheet } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { Input } from "@/components/ui/input";
import { Button, LinkButton } from "@/components/ui/button";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Text } from "@/components/ui/text";

const VerificationModal = () => {
	const [verificationCode, setVerificationCode] = React.useState("");

	const { signUp, setActive: signUpSetActive } = useSignUp();
	const { signIn } = useSignIn();

	const { variant } = useLocalSearchParams<{
		variant: "sign_up" | "sign_in";
	}>();

	if (!signUp || !signIn) return null;

	const handleSubmitVerificationCode = async () => {
		if (variant === "sign_in") {
			try {
				const signInAttempt = await signIn.attemptFirstFactor({
					strategy: "email_code",
					code: verificationCode,
				});

				if (signInAttempt.status === "complete") {
					await signUpSetActive({ session: signInAttempt.createdSessionId });

					router.push("/stash");
				} else {
					console.error(signInAttempt);
				}
			} catch (err) {
				console.error("Error:", JSON.stringify(err, null, 2));
			}
		} else {
			try {
				const signUpAttempt = await signUp.attemptEmailAddressVerification({
					code: verificationCode,
				});

				if (signUpAttempt.status === "complete") {
					await signUpSetActive({ session: signUpAttempt.createdSessionId });

					router.push("/stash");
				} else {
					console.error(signUpAttempt);
				}
			} catch (err) {
				console.error("Error:", JSON.stringify(err, null, 2));
			}
		}
	};

	return (
		<AnimatedView
			entering={FadeIn}
			className="flex w-full h-full justify-center items-center bg-black/50"
		>
			<AnimatedView entering={FadeIn} className="w-[80%] max-w-lg">
				<Card>
					<CardHeader>
						<CardTitle>Verification Code</CardTitle>
					</CardHeader>
					<CardContent>
						<Input
							className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
							placeholder="verification code"
							keyboardType="number-pad"
							autoCapitalize="none"
							value={verificationCode}
							onChangeText={setVerificationCode}
						/>
					</CardContent>
					<CardFooter className="flex-row justify-between">
						<LinkButton href="../" variant="link">
							<Text className="font-semibold">Back</Text>
						</LinkButton>
						<Button onPress={handleSubmitVerificationCode}>
							<Text className="font-semibold">Continue</Text>
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

export default VerificationModal;
