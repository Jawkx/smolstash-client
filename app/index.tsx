import * as React from "react";
import { Button } from "@rnr/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@rnr/components/ui/card";
import { Input } from "@rnr/components/ui/input";
import { Label } from "@rnr/components/ui/label";
import { Text } from "@rnr/components/ui/text";
import { Platform, View } from "react-native";

export default function Index() {
	const isWeb = Platform.OS === "web";

	return (
		<View className="w-full h-full bg-background p-8 flex-row items-center justify-center">
			{isWeb ? (
				<View>
					<Text className="text-lg">Comfy Stash</Text>
				</View>
			) : null}
			<CardWithForm />
		</View>
	);
}

const CardWithForm = () => {
	return (
		<Card className="w-[300]">
			<CardHeader>
				<CardTitle>Comfy Stash</CardTitle>
				<CardDescription>Sign In</CardDescription>
			</CardHeader>
			<CardContent>
				<View className="flex flex-col space-y-1.5">
					<Label htmlFor="name">Name</Label>
					<Input id="Email" placeholder="Name of your project" />
				</View>
				<View className="h-4" />
				<View className="flex flex-col space-y-1.5">
					<Label htmlFor="framework">Password</Label>
					<Input id="Password" placeholder="Password" secureTextEntry />
				</View>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button variant="outline">
					<Text>Sign Up</Text>
				</Button>
				<Button>
					<Text>Sign In</Text>
				</Button>
			</CardFooter>
		</Card>
	);
};
