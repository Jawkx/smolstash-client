import React from "react";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Button } from "@/components/ui/button";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<Button>{}</Button>
		</>
	);
}
