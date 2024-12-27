import React from "react";
import { LoginScreen } from "@/components/screens/LoginScreen";

						<Button
							onPress={handleSignIn}
							className="flex-row"
							disabled={isLoading}
						>
							<Text className="font-semibold">Continue</Text>
						</Button>
const Login = () => {
	return <LoginScreen />;
};

export default Login;
