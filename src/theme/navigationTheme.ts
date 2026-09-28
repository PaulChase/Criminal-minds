import { DarkTheme, type Theme } from "@react-navigation/native";
import { colors } from "./colors";

export const navigationTheme: Theme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		primary: colors.primary,
		background: colors.bg,
		card: colors.surface,
		border: colors.border,
		text: colors.text,
	},
};
