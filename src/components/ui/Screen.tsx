import { View, type ViewProps } from "react-native";
import { cn } from "./cn";

export function Screen({ className, ...props }: ViewProps) {
	return <View className={cn("flex-1 bg-bg", className)} {...props} />;
}
