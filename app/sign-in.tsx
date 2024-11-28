import React from "react";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Text } from "@ui/text";
import { View } from "react-native";

export default function SignIn() {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe items-center justify-center w-full h-full">
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
