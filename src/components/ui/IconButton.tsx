import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { colors } from "@/theme/colors";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface IconButtonProps extends Omit<PressableProps, "style"> {
	icon: IconName;
	accessibilityLabel: string;
	size?: number;
	color?: string;
	style?: StyleProp<ViewStyle>;
}

export function IconButton({ icon, size = 22, color = colors.text, style, ...props }: IconButtonProps) {
	return (
		<Pressable
			hitSlop={8}
			accessibilityRole="button"
			// NativeWind's Pressable wrapper drops function styles, so pressed feedback comes from `active:`.
			className="active:opacity-60"
			style={[{ padding: 8, borderRadius: 999 }, style]}
			{...props}
		>
			<Ionicons name={icon} size={size} color={color} />
		</Pressable>
	);
}
