import { useCallback, useRef, useState } from "react";
import { getFeedPool, type CharacterId } from "@/data";
import { createFeedEngine, type FeedItem } from "./feedEngine";

/** Keeps appending shuffled passes as the user nears the end. Remount (via `key`) to change the filter. */
export function useFeed(characters: readonly CharacterId[]) {
	const [engine] = useState(() => createFeedEngine(getFeedPool(characters)));
	const [items, setItems] = useState<FeedItem[]>(() => engine.nextPass());
	const itemsRef = useRef(items);
	itemsRef.current = items;
	const appendedAtLength = useRef(-1);

	const loadMore = useCallback(() => {
		const current = itemsRef.current;
		// onEndReached can fire several times for the same list length; append once per length.
		if (engine.finite || appendedAtLength.current === current.length) return;
		appendedAtLength.current = current.length;
		setItems([...current, ...engine.nextPass()]);
	}, [engine]);

	return { items, loadMore, finite: engine.finite };
}
