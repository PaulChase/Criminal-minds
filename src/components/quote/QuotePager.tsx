import { useCallback, useState, type ReactElement } from "react";
import { FlatList, PixelRatio, View, type LayoutChangeEvent, type ListRenderItemInfo } from "react-native";
import type { FeedItem } from "@/features/feed/feedEngine";
import { QuotePage } from "./QuotePage";

interface QuotePagerProps {
	items: readonly FeedItem[];
	initialIndex?: number;
	onEndReached?: () => void;
	/** Rendered after the last page at full page height (e.g. the end of a finite feed). */
	renderFooter?: (pageHeight: number) => ReactElement;
	/** Extra bottom padding for pages that reach the screen edge (no tab bar below). */
	bottomInset?: number;
}

const keyExtractor = (item: FeedItem) => item.key;

/**
 * Vertical, one-page-per-swipe list of quote cards. Pages are exactly the measured height, so
 * paging never drifts, and `getItemLayout` lets the list skip measuring.
 */
export function QuotePager({ items, initialIndex = 0, onEndReached, renderFooter, bottomInset = 0 }: QuotePagerProps) {
	const [pageHeight, setPageHeight] = useState(0);

	const onLayout = useCallback((e: LayoutChangeEvent) => {
		// Fractional heights make Android paging drift after many pages.
		const height = PixelRatio.roundToNearestPixel(e.nativeEvent.layout.height);
		setPageHeight((prev) => (Math.abs(prev - height) < 0.5 ? prev : height));
	}, []);

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<FeedItem>) => <QuotePage item={item} height={pageHeight} bottomInset={bottomInset} />,
		[pageHeight, bottomInset]
	);

	const getItemLayout = useCallback(
		(_: ArrayLike<FeedItem> | null | undefined, index: number) => ({ length: pageHeight, offset: pageHeight * index, index }),
		[pageHeight]
	);

	return (
		<View style={{ flex: 1 }} onLayout={onLayout}>
			{pageHeight > 0 ? (
				<FlatList
					data={items}
					keyExtractor={keyExtractor}
					renderItem={renderItem}
					getItemLayout={getItemLayout}
					initialScrollIndex={Math.max(0, Math.min(initialIndex, items.length - 1))}
					pagingEnabled
					disableIntervalMomentum
					decelerationRate="fast"
					showsVerticalScrollIndicator={false}
					bounces={false}
					overScrollMode="never"
					// Keep the next two pages mounted so their images are decoded before they scroll in.
					initialNumToRender={2}
					maxToRenderPerBatch={2}
					windowSize={5}
					onEndReached={onEndReached}
					onEndReachedThreshold={3}
					ListFooterComponent={renderFooter?.(pageHeight)}
				/>
			) : null}
		</View>
	);
}
