import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";
import { colors } from "@/theme/colors";

/** Big heart that pops in the middle of the page on double-tap. Drive `progress` 0 → 1 → 0. */
export function HeartBurst({ progress }: { progress: SharedValue<number> }) {
	const style = useAnimatedStyle(() => ({
		opacity: progress.value,
		transform: [{ scale: interpolate(progress.value, [0, 1], [0.4, 1]) }],
	}));
	return (
		<Animated.View pointerEvents="none" style={[styles.container, style]}>
			<Ionicons name="heart" size={120} color={colors.favorite} style={styles.shadow} />
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFill,
		alignItems: "center",
		justifyContent: "center",
	},
	shadow: {
		textShadowColor: "rgba(0,0,0,0.35)",
		textShadowRadius: 16,
	},
});
