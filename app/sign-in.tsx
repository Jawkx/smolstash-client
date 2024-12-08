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
import { Input } from "@ui/input";
import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { FadeIn, SlideInDown } from "react-native-reanimated";

const SignInModal = () => {
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
						<CardDescription>Sign In to access all your stash</CardDescription>
					</CardHeader>
					<CardContent>
						<Input
							className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
							placeholder="Email"
							keyboardType="email-address"
							autoCapitalize="none"
						/>
					</CardContent>
					<CardFooter>
						<Button>
							<Text className="font-semibold">Sign in</Text>
						</Button>
					</CardFooter>
				</Card>
			</AnimatedView>
		</AnimatedView>
	);
};

export default SignInModal;
