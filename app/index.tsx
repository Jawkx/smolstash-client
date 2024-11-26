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
import { View } from "react-native";

export default function Index() {
	return (
		<View className="w-full h-full bg-background p-8 flex-row items-center justify-center">
			<CardWithForm />
		</View>
	);
}

const CardWithForm = () => {
	return (
		<Card className="w-[300]">
			<CardHeader>
				<CardTitle>ComfyStash</CardTitle>
				<CardDescription>Comfy file storage</CardDescription>
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
	);
};
