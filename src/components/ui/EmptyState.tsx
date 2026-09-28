import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps, ReactNode } from "react";
import { View } from "react-native";
import { colors } from "@/theme/colors";
import { AppText } from "./AppText";

interface EmptyStateProps {
	icon: ComponentProps<typeof Ionicons>["name"];
	title: string;
	message?: string;
	children?: ReactNode;
}

export function EmptyState({ icon, title, message, children }: EmptyStateProps) {
	return (
		<View className="flex-1 items-center justify-center gap-3 px-10 py-16">
			<View className="h-20 w-20 items-center justify-center rounded-full bg-surface">
				<Ionicons name={icon} size={36} color={colors.primary} />
			</View>
			<AppText className="text-center font-text-semibold text-lg">{title}</AppText>
			{message ? <AppText className="text-center text-muted">{message}</AppText> : null}
			{children}
		</View>
	);
}
