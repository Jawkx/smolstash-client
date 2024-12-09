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
import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from "@clerk/clerk-expo";
import { ClerkAPIResponseError } from "@clerk/clerk-js";
import { Input } from "@ui/input";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";

const SignInModal = () => {
	const [email, setEmail] = React.useState("");
	const router = useRouter();

	const { signUp } = useSignUp();
	const { signIn } = useSignIn();

	if (!signUp || !signIn) return null;

	const handleSubmitForm = async () => {
		try {
			await signUp.create({ emailAddress: email });
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
		} catch (e) {
			if (isClerkAPIResponseError(e)) {
				const typedError = e as ClerkAPIResponseError;

				console.log(typedError.errors);
			}
		}
		router.push("/sign-in/verification");
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
						<CardTitle>Sign In</CardTitle>
					</CardHeader>
					<CardContent>
						<Input
							className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
							placeholder="Email"
							keyboardType="email-address"
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
						/>
					</CardContent>
					<CardFooter>
						<Button onPress={handleSubmitForm}>
							<Text className="font-semibold">Continue</Text>
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

export default SignInModal;
