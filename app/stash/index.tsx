import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Moon, Sun } from "lucide-react-native";
import React from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

const Stash = () => {
	const { userId, signOut, getToken } = useAuth();
	const { toggleColorScheme, colorScheme } = useColorScheme();
	const [accessToken, setAccessToken] = React.useState<string | null>(null);

	const router = useRouter();

	const handleSignOut = () => {
		router.navigate("/");
		signOut();
	};

	React.useEffect(() => {
		getToken().then((token) => setAccessToken(token));
	}, []);

	const handleCopyToken = () => {
		if (accessToken) {
			Clipboard.setStringAsync(accessToken).then(() => {
				Toast.show({ type: "success", text1: "access token copied" });
			});
		}
	};

	return (
		<View className="w-full h-full justify-center items-center">
			<View className="absolute top-6 flex-row w-full px-6 justify-end">
				<Button onPress={handleSignOut}>
					<Text className="font-semibold">Sign out</Text>
				</Button>

				<Button variant="link" onPress={toggleColorScheme}>
					{colorScheme === "dark" ? (
						<Moon className="text-foreground" />
					) : (
						<Sun className="text-foreground" />
					)}
				</Button>
			</View>

			<View className="px-12 max-w-[500]">
				<Text className="text-center">Work In Progress</Text>
				<View className="h-8" />
				<TouchableOpacity onPress={handleCopyToken}>
					<Text
						className="text-center"
						numberOfLines={1}
						ellipsizeMode="middle"
					>
						{accessToken}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Stash;
