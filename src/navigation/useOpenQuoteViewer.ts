import { useNavigation } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import type { Quote } from "@/data";

/** Returns `open(index)`, which shows `quotes` in the full-screen swiper starting at `index`. */
export function useOpenQuoteViewer(quotes: readonly Quote[], title?: string) {
	const navigation = useNavigation();
	const quoteIds = useMemo(() => quotes.map((q) => q.id), [quotes]);
	return useCallback(
		(initialIndex: number) => navigation.navigate("QuoteViewer", { quoteIds, initialIndex, title }),
		[navigation, quoteIds, title]
	);
}
