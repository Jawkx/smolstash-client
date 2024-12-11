import { AnimatedView } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
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
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";
import { SignInFirstFactor, EmailCodeFactor } from "@clerk/types";

const LoginModal = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const router = useRouter();

	const { signUp } = useSignUp();
	const { signIn } = useSignIn();

	if (!signUp || !signIn) return null;

	const handleSignIn = async () => {
		setIsLoading(true);
		try {
			const { supportedFirstFactors } = await signIn.create({
				identifier: email,
			});

			const isPhoneCodeFactor = (
				factor: SignInFirstFactor,
			): factor is EmailCodeFactor => {
				return factor.strategy === "email_code";
			};

			const emailCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor);

			if (emailCodeFactor) {
				const { emailAddressId } = emailCodeFactor;

				await signIn.prepareFirstFactor({
					strategy: "email_code",
					emailAddressId,
				});
			}

			setIsLoading(false);
			router.push({
				pathname: "/sign-in/verification",
				params: { variant: "sign_in" },
			});
		} catch (e) {
			if (isClerkAPIResponseError(e)) {
				const typedError = e as ClerkAPIResponseError;

				typedError.errors.forEach((error) => {
					if (error.code === "form_identifier_not_found") {
						handleSignUp();
					}
				});

				setIsLoading(false);
			}
		}
	};

	const handleSignUp = async () => {
		setIsLoading(true);
		try {
			await signUp.create({ emailAddress: email });
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

			router.push({
				pathname: "/login/verification",
				params: { variant: "sign_up" },
			});
		} catch (e) {
			if (isClerkAPIResponseError(e)) {
				const typedError = e as ClerkAPIResponseError;
				console.log(typedError.errors);
			}
		}
		setIsLoading(false);
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
						<CardTitle>Login</CardTitle>
						<CardDescription>
							Enter your email to sign in or create a new account
						</CardDescription>
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
						<Button onPress={handleSignIn} className="flex-row">
							{isLoading ? (
								<ActivityIndicator />
							) : (
								<Text className="font-semibold">Continue</Text>
							)}
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

export default LoginModal;
