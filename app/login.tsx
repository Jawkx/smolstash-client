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
	useAuth,
	useSignIn,
	useSignUp,
} from "@clerk/clerk-expo";
import { ClerkAPIResponseError } from "@clerk/clerk-js";
import { Input } from "@ui/input";
import { Link, Redirect, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";
import { SignInFirstFactor, EmailCodeFactor } from "@clerk/types";
import Toast from "react-native-toast-message";

const LoginModal = () => {
	const { isSignedIn } = useAuth();

	const [variant, setVariant] = React.useState<"sign_in" | "sign_up">(
		"sign_in",
	);
	const [isLoading, setIsLoading] = React.useState(false);
	const [email, setEmail] = React.useState("");
	const [isVerifying, setIsVerifying] = React.useState(false);
	const [verificationCode, setVerificationCode] = React.useState("");

	const router = useRouter();

	const { signUp, setActive: signUpSetActive } = useSignUp();
	const { signIn } = useSignIn();

	React.useEffect(() => {
		if (verificationCode.length === 6) {
			handleSubmitVerificationCode();
		}
	}, [verificationCode]);

	if (isSignedIn) return <Redirect href="/stash" />;
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
				}
			} catch (err) {
				if (isClerkAPIResponseError(err)) {
					Toast.show({ type: "error", text1: err.message });
				}
			}
		}
	};

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

			setIsVerifying(true);
			setIsLoading(false);
		} catch (e) {
			if (isClerkAPIResponseError(e)) {
				const typedError = e as ClerkAPIResponseError;

				typedError.errors.forEach((error) => {
					if (error.code === "form_identifier_not_found") {
						setVariant("sign_up");
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

			setIsVerifying(true);
			setIsLoading(false);
		} catch (e) {
			if (isClerkAPIResponseError(e)) {
				const typedError = e as ClerkAPIResponseError;
				Toast.show({ type: "error", text1: typedError.message });
			}
		}
		setIsLoading(false);
	};

	return (
		<AnimatedView
			entering={FadeIn}
			className="flex w-full h-full justify-center items-center bg-black/50"
		>
			<Link href="../" push asChild>
				<Pressable style={StyleSheet.absoluteFill} />
			</Link>

			<AnimatedView entering={SlideInDown} className="w-[80%] max-w-lg">
				<Card>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>
							{isVerifying
								? "Enter the verification code sent to your email"
								: "Enter your email to sign in or create a new account"}
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isLoading ? (
							<View>
								<Text className="text-xl">Loading</Text>
							</View>
						) : isVerifying ? (
							<CodeInput
								code={verificationCode}
								setCode={setVerificationCode}
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
							onPress={handleSignIn}
							className="flex-row"
							disabled={isLoading}
						>
							<Text className="font-semibold">Continue</Text>
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

const CODE_LENGTH = 6;

interface CodeInputProps {
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
}

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
						className={`flex-1 h-12 w-max-[20px] border-2 rounded-lg items-center justify-center ${
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
export default LoginModal;
