import React from "react";
import Animated from "react-native-reanimated";
import type { ViewProps } from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import { cssInterop } from "nativewind";
import { cn } from "@/lib/utils";

const InteropAnimatedView = cssInterop(Animated.View, { className: "style" });

export const AnimatedView = ({
	className,
	...animatedViewProps
}: AnimatedProps<ViewProps>) => {
	return (
		<InteropAnimatedView {...animatedViewProps} className={cn(className)} />
	);
};
