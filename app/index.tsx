import * as React from "react";
import { View } from "react-native";
import { Text } from "@rnr/components/ui/text";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/@rnr/components/ui/card";
import { Label } from "@/@rnr/components/ui/label";
import { Input } from "@/@rnr/components/ui/input";
import { Button } from "@/@rnr/components/ui/button";
import { Link } from "expo-router";

export default function HomePage() {
	return (
		<View className="bg-background w-full h-full">
			<View className="mt-safe flex-row justify-center items-center h-screen w-screen">
				<Link href="/sign-in" className="absolute top-6 right-6">
					<Button>
						<Text className="font-semibold">Sign In</Text>
					</Button>
				</Link>

				<Card className="w-5/6 max-w-[500]">
					<CardHeader>
						<CardTitle>Access Stash</CardTitle>
					</CardHeader>

					<CardContent>
						<View className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Stash Id</Label>
							<Input id="stashId" placeholder="Fill in your Stash Id" />
						</View>
						<View className="h-3" />
					</CardContent>

					<CardFooter className="justify-end">
						<Button>
							<Text className="font-semibold">Access Stash</Text>
						</Button>
					</CardFooter>
				</Card>
			</View>
		</View>
	);
}
