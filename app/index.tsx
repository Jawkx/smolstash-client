import * as React from "react";
import { View } from "react-native";
import { Link } from "expo-router";
import { Button } from "@ui/button";
import { Text } from "@ui/text";

export default function HomePage() {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe flex-row justify-center items-center h-screen w-screen">
				<Link href="/sign-in" className="absolute top-6 right-6">
					<Button>
						<Text className="font-semibold">Sign In</Text>
					</Button>
				</Link>

				<Text>In Progress</Text>
			</View>
		</View>
	);
}
