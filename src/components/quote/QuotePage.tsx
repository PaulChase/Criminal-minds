import * as Haptics from "expo-haptics";
import { memo, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Easing, useSharedValue, withDelay, withSequence, withTiming } from "react-native-reanimated";
import type { FeedItem } from "@/features/feed/feedEngine";
import { useFavorites } from "@/features/favorites/favoritesStore";
import { HeartBurst } from "./HeartBurst";
import { QuoteActions } from "./QuoteActions";
import { QuoteCard } from "./QuoteCard";

interface QuotePageProps {
	item: FeedItem;
	height: number;
	bottomInset?: number;
}

/** One full-screen page of the swiper: the captured card, plus overlays that stay out of the capture. */
export const QuotePage = memo(function QuotePage({ item, height, bottomInset = 0 }: QuotePageProps) {
	const cardRef = useRef<View>(null);
	const burst = useSharedValue(0);
	const quoteId = item.quote.id;

	// Double-tap only ever adds a favorite (like Instagram); the heart button toggles.
	const doubleTap = useMemo(
		() =>
			Gesture.Tap()
				.numberOfTaps(2)
				.maxDelay(250)
				.runOnJS(true)
				.onEnd((_event, success) => {
					if (!success) return;
					useFavorites.getState().add(quoteId);
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
					burst.value = withSequence(
						withTiming(1, { duration: 180, easing: Easing.out(Easing.back(2.5)) }),
						withDelay(400, withTiming(0, { duration: 220 }))
					);
				}),
		[burst, quoteId]
	);

	return (
		<View style={{ height }}>
			<GestureDetector gesture={doubleTap}>
				<View collapsable={false} style={StyleSheet.absoluteFill}>
					<QuoteCard ref={cardRef} quote={item.quote} background={item.background} height={height} bottomInset={bottomInset} />
				</View>
			</GestureDetector>
			<HeartBurst progress={burst} />
			<QuoteActions quote={item.quote} cardRef={cardRef} bottomInset={bottomInset} />
		</View>
	);
});
