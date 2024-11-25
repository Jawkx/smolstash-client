import * as React from "react"
import { Button } from "@rnr/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@rnr/components/ui/card"
import { Input } from "@rnr/components/ui/input"
import { Label } from "@rnr/components/ui/label"
import { Text } from "@rnr/components/ui/text"
import { View } from "react-native"

export default function Index() {
    return <View className="w-full h-full bg-background p-8 items-center justify-center"><CardWithForm /></View>;
}

const CardWithForm = () => {
    return (
        <Card className="w-full">
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
                <Button variant="outline"><Text>SignUp</Text></Button>
                <Button><Text>SignIn</Text></Button>
            </CardFooter>
        </Card>
    )
}
