import React from "react";
import { View } from "react-native";
import { LinkButton } from "@ui/button";
import { Text } from "@ui/text";

const IndexPage = () => {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe flex-row justify-center items-center h-screen w-screen bg-background">
				<View className="absolute top-6 right-6 flex-row">
					<LinkButton href="/sign-in">
						<Text className="font-semibold">Sign Up</Text>
					</LinkButton>
					<View className="w-2" />
					<LinkButton href="/sign-in" variant="secondary">
						<Text className="font-semibold">Sign In</Text>
					</LinkButton>
				</View>

				<Text>In Progress</Text>
			</View>
		</View>
	);
};

export default IndexPage;
