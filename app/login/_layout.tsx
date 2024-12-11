import React from "react";
import {
	Redirect,
	Stack,
	useRootNavigationState,
	useRouter,
} from "expo-router";
import { useAuth, useSignUp } from "@clerk/clerk-expo";

const LogInLayout = () => {
	const { signUp } = useSignUp();
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href="/stash" />;
	}

	if (!signUp) return null;

	return (
		<Stack
			screenOptions={{
				presentation: "transparentModal",
				animation: "fade",
				headerShown: false,
			}}
		>
			<Stack.Screen name="index" />
			<Stack.Screen name="verification" />
		</Stack>
	);
};

export default LogInLayout;
