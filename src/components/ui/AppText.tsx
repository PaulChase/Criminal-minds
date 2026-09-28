import { Text, type TextProps } from "react-native";
import { cn } from "./cn";

// Use the font-* families for weight; combining them with font-semibold/font-bold makes Android fall back to Roboto.
export function AppText({ className, ...props }: TextProps) {
	return <Text className={cn("text-white font-text-regular", className)} {...props} />;
}
