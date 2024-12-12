import React from "react";
import { AnimatedView } from "@/components/ui/animated";
import { Link, router, useLocalSearchParams } from "expo-router";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { LinkButton } from "@/components/ui/button";
import {
	isClerkAPIResponseError,
	useSignIn,
	useSignUp,
} from "@clerk/clerk-expo";
import { Text } from "@/components/ui/text";
import Toast from "react-native-toast-message";
import { ClerkAPIResponseError } from "@clerk/clerk-js";

const CODE_LENGTH = 6;

const VerificationModal = () => {
	const [verificationCode, setVerificationCode] = React.useState("");

	const { signUp, setActive: signUpSetActive } = useSignUp();
	const { signIn } = useSignIn();

	const { variant } = useLocalSearchParams<{
		variant: "sign_up" | "sign_in";
	}>();

	React.useEffect(() => {
		if (verificationCode.length === 6) {
			handleSubmitVerificationCode();
		}
	}, [verificationCode]);

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

					router.replace("/stash");
				} else {
					Toast.show({ type: "error", text1: "error signing in" });
					console.error(signInAttempt);
				}
			} catch (err) {
				if (isClerkAPIResponseError(err)) {
					const typedError = err as ClerkAPIResponseError;

					typedError.errors.forEach(({ message }) => {
						Toast.show({ type: "error", text1: message });
						return;
					});
				}
				Toast.show({ type: "error", text1: "error signing in" });
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
					Toast.show({ type: "error", text1: "error signing in" });
					console.error(signUpAttempt);
				}
			} catch (err) {
				Toast.show({ type: "error", text1: "error signing in" });
				console.error("Error:", JSON.stringify(err, null, 2));
			}
		}
	};

	return (
		<AnimatedView
			entering={FadeIn}
			className="flex w-full h-full justify-center items-center bg-black/50"
		>
			<Link href="../" asChild>
				<Pressable style={StyleSheet.absoluteFill} />
			</Link>

			<AnimatedView entering={FadeIn} className="w-[80%] max-w-lg">
				<Card>
					<CardHeader>
						<CardTitle>Verification Code</CardTitle>
					</CardHeader>
					<CardContent>
						<CodeInput code={verificationCode} setCode={setVerificationCode} />
					</CardContent>
					<CardFooter className="flex-row justify-end">
						<LinkButton href="../">
							<Text className="font-semibold">Back</Text>
						</LinkButton>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

interface CodeInputProps {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
}

const CodeInput = ({ code, setCode }: CodeInputProps) => {
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
						className={`w-9 h-12 border-2 rounded-lg items-center justify-center ${
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

export default VerificationModal;
