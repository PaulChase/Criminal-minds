import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useToastStore, type ToastKind } from "@/features/toast/toastStore";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

const ICONS: Record<ToastKind, { name: "checkmark-circle" | "alert-circle" | "information-circle"; color: string }> = {
	success: { name: "checkmark-circle", color: "#22c55e" },
	error: { name: "alert-circle", color: colors.danger },
	info: { name: "information-circle", color: colors.primaryLight },
};

/** Renders the current toast above the tab bar. Mount once, after the NavigationContainer. */
export function ToastHost() {
	const toast = useToastStore((s) => s.toast);
	const hide = useToastStore((s) => s.hide);
	const insets = useSafeAreaInsets();

	return (
		<View pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.host, { paddingBottom: insets.bottom + 68 }]}>
			{toast ? (
				<Animated.View key={toast.id} entering={FadeInDown.duration(180)} exiting={FadeOutDown.duration(180)} style={styles.toast} accessibilityLiveRegion="polite" accessibilityRole="alert">
					<Ionicons name={ICONS[toast.kind].name} size={20} color={ICONS[toast.kind].color} />
					<Text style={styles.message} maxFontSizeMultiplier={1.3}>
						{toast.message}
					</Text>
					{toast.action ? (
						<Pressable
							hitSlop={8}
							onPress={() => {
								toast.action?.onPress();
								hide();
							}}
						>
							<Text style={styles.action}>{toast.action.label}</Text>
						</Pressable>
					) : null}
				</Animated.View>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	host: {
		justifyContent: "flex-end",
		alignItems: "center",
		paddingHorizontal: 16,
	},
	toast: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		maxWidth: 480,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 14,
		backgroundColor: "rgba(36,36,36,0.97)",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "rgba(255,255,255,0.12)",
		shadowColor: "#000",
		shadowOpacity: 0.4,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 4 },
		elevation: 8,
	},
	message: {
		flexShrink: 1,
		color: colors.text,
		fontFamily: fonts.medium,
		fontSize: 14,
	},
	action: {
		color: colors.primaryLight,
		fontFamily: fonts.semibold,
		fontSize: 14,
	},
});
