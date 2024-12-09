import { AnimatedView } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Input } from "@ui/input";
import { Link, router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";

const SignInModal = () => {
	const [email, setEmail] = React.useState("");
	const [verifying, setVerifying] = React.useState(false);

	const [verificationCode, setVerificationCode] = React.useState("");

	const { signUp, isLoaded, setActive } = useSignUp();

	if (!signUp) return null;

	const handleSubmitForm = async () => {
		try {
			await signUp.create({ emailAddress: email });
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
		} catch (e) {
			console.log(e);
		}

		setVerifying(true);
		setEmail("");
	};

	const handleSubmitVerificationCode = async () => {
		try {
			// Use the code provided by the user and attempt verification
			const signInAttempt = await signUp.attemptEmailAddressVerification({
				code: verificationCode,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });

				router.push("/");
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
			<Link href="/" asChild>
				<Pressable style={StyleSheet.absoluteFill} />
			</Link>

			<AnimatedView entering={SlideInDown} className="w-[80%] max-w-lg">
				<Card>
					<CardHeader>
						<CardTitle>{verifying ? "Verification Code" : "Sign In"}</CardTitle>
					</CardHeader>
					<CardContent>
						{verifying ? (
							<Input
								className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
								placeholder="verification code"
								keyboardType="numeric"
								autoCapitalize="none"
								value={verificationCode}
								onChangeText={setVerificationCode}
							/>
						) : (
							<Input
								className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
								placeholder="Email"
								keyboardType="email-address"
								autoCapitalize="none"
								value={email}
								onChangeText={setEmail}
							/>
						)}
					</CardContent>
					<CardFooter>
						<Button
							onPress={
								verifying ? handleSubmitVerificationCode : handleSubmitForm
							}
						>
							<Text className="font-semibold">Continue</Text>
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

export default SignInModal;
