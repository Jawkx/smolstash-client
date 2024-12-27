import {
	useAuth,
	useSignIn,
	useSignUp,
	isClerkAPIResponseError,
} from "@clerk/clerk-expo";
import { ClerkAPIResponseError } from "@clerk/clerk-js";
import { SignInFirstFactor, EmailCodeFactor } from "@clerk/types";
import { useRouter } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export const useLoginFlow = () => {
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

	const handleSubmitVerificationCode = async () => {
		if (!signIn || !signUp) return;

		if (variant === "sign_in") {
			try {
				const signInAttempt = await signIn?.attemptFirstFactor({
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
				const signUpAttempt = await signUp?.attemptEmailAddressVerification({
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
			const { supportedFirstFactors } = await signIn!.create({
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
				await signIn!.prepareFirstFactor({
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
			await signUp?.create({ emailAddress: email });
			await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
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

	return {
		isSignedIn,
		isLoading,
		email,
		setEmail,
		isVerifying,
		verificationCode,
		setVerificationCode,
		handleSignIn,
		signIn,
		signUp,
	};
};
