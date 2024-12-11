import React from "react";
import { View } from "react-native";
import { LinkButton } from "@ui/button";
import { Text } from "@ui/text";

const IndexPage = () => {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe flex-row justify-center items-center h-screen w-screen bg-background">
				<View className="absolute top-6 right-6 flex-row">
					<LinkButton href="/login">
						<Text className="font-semibold">Sign Up / Login</Text>
					</LinkButton>
				</View>

				<Text>In Progress</Text>
			</View>
		</View>
	);
};

export default IndexPage;
