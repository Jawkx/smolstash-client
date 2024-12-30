import { Text } from "@/components/ui/text";
import { Input } from "@ui/input";
import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useLoginFlow } from "./useLoginFlow";
import { CodeInput } from "./VerificationCodeInput";
import { Button } from "@/components/ui/button";
import { LoginScreenTop } from "./LoginScreenTop";

export const LoginScreen = () => {
	const {
		isSignedIn,
		isLoading,
		email,
		setEmail,
		isVerifying,
		verificationCode,
		setVerificationCode,
		handleSignIn,
	} = useLoginFlow();

	if (isSignedIn) return <Redirect href="/stash" />;

	return (
		<View className="flex w-full h-full justify-center px-5">
			<LoginScreenTop />
			<Text className="font-bold text-4xl">Log In</Text>

			<Text>
				{isVerifying
					? "Enter the verification code sent to your email"
					: "Enter your email to sign in or create a new account"}
			</Text>

			<View className="h-3" />

			{isLoading ? (
				<View>
					<Text className="text-xl">Loading</Text>
				</View>
			) : isVerifying ? (
				<>
					<CodeInput code={verificationCode} setCode={setVerificationCode} />
					<View className="h-3" />
				</>
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

			<Button onPress={handleSignIn} className="flex-row" disabled={isLoading}>
				<Text className="font-semibold">Continue</Text>
			</Button>
		</View>
	);
};
