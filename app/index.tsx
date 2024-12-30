import React from "react";
import { Platform, View } from "react-native";
import { Button, LinkButton } from "@ui/button";
import { Text } from "@ui/text";
import { Moon, Sun } from "@lib/icons";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const IndexPage = () => {
	const { isSignedIn } = useAuth();

	if (isSignedIn) {
		return <Redirect href="/stash" />;
	} else {
		return <Redirect href="/login" />;
	}
};

export default IndexPage;
