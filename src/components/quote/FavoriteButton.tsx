import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from "react-native-reanimated";
import type { QuoteId } from "@/data";
import { useFavorites, useIsFavorite } from "@/features/favorites/favoritesStore";
import { colors } from "@/theme/colors";

interface FavoriteButtonProps {
	id: QuoteId;
	size?: number;
	/** Color of the outline heart when not favorited. */
	color?: string;
}

export function FavoriteButton({ id, size = 22, color = colors.muted }: FavoriteButtonProps) {
	const isFavorite = useIsFavorite(id);
	const scale = useSharedValue(1);
	const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

	const onPress = () => {
		const added = useFavorites.getState().toggle(id);
		Haptics.impactAsync(added ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Light);
		if (added) scale.value = withSequence(withTiming(1.3, { duration: 110 }), withSpring(1));
	};

	return (
		<Pressable
			onPress={onPress}
			hitSlop={10}
			accessibilityRole="button"
			accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
			accessibilityState={{ selected: isFavorite }}
		>
			<Animated.View style={style}>
				<Ionicons name={isFavorite ? "heart" : "heart-outline"} size={size} color={isFavorite ? colors.favorite : color} />
			</Animated.View>
		</Pressable>
	);
}
