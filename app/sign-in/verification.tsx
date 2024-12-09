import React from "react";
import { AnimatedView } from "@/components/ui/animated";
import { Link, router } from "expo-router";
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

	if (!signUp || !signIn) return null;

	const handleSubmitVerificationCode = async () => {
		try {
			const signInAttempt = await signUp.attemptEmailAddressVerification({
				code: verificationCode,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await signUpSetActive({ session: signInAttempt.createdSessionId });

				router.push("/stash");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(signInAttempt);
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error("Error:", JSON.stringify(err, null, 2));
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
