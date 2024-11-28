import * as React from "react";
import { Button } from "@rnr/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@rnr/components/ui/card";
import { Input } from "@rnr/components/ui/input";
import { Label } from "@rnr/components/ui/label";
import { Text } from "@rnr/components/ui/text";
import { View } from "react-native";

export default function SignIn() {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe items-center justify-center h-screen w-screen">
				<Card className="w-5/6 max-w-[500]">
					<CardHeader>
						<CardTitle>Sign In</CardTitle>
					</CardHeader>

					<CardContent>
						<View className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Email</Label>
							<Input id="Email" placeholder="Your Email" />
						</View>
						<View className="h-3" />
						<Button className="w-full">
							<Text className="font-semibold">Get Login Code</Text>
						</Button>
					</CardContent>
				</Card>
			</View>
		</View>
	);
}