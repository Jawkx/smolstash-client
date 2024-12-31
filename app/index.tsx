import React from "react";
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
