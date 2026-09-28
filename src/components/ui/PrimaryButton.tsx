import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, type PressableProps } from "react-native";
import { AppText } from "./AppText";
import { cn } from "./cn";

interface PrimaryButtonProps extends PressableProps {
	title: string;
	icon?: ComponentProps<typeof Ionicons>["name"];
	variant?: "solid" | "outline";
	className?: string;
}

export function PrimaryButton({ title, icon, variant = "solid", className, ...props }: PrimaryButtonProps) {
	return (
		<Pressable
			accessibilityRole="button"
			className={cn(
				"flex-row items-center justify-center gap-2 rounded-full px-6 py-3 active:opacity-70",
				variant === "solid" ? "bg-primary" : "border border-primary",
				className
			)}
			{...props}
		>
			{icon ? <Ionicons name={icon} size={18} color="white" /> : null}
			<AppText className="font-text-semibold">{title}</AppText>
		</Pressable>
	);
}
