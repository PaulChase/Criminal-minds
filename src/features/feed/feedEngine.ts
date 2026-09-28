import type { ImageSourcePropType } from "react-native";
import { getCharacter, type CharacterId, type Quote } from "@/data";
import { mulberry32, shuffle, type Random } from "./rng";

export interface FeedItem {
	key: string;
	quote: Quote;
	/** Chosen when the feed is built so a page never swaps images on re-render or recycle. */
	background: ImageSourcePropType;
}

/** Pools smaller than this (e.g. only Elle's single quote) are shown once instead of looping. */
const MIN_LOOPING_POOL = 4;
/** Minimum distance between two appearances of the same quote across passes. */
const MAX_LOOKBACK = 6;

/** Hands out a character's backgrounds in rotation, starting at a random image. */
export function createBackgroundPicker(random: Random) {
	const cursors = new Map<CharacterId, number>();
	return (id: CharacterId) => {
		const { backgrounds } = getCharacter(id);
		const cursor = cursors.get(id) ?? Math.floor(random() * backgrounds.length);
		cursors.set(id, cursor + 1);
		return backgrounds[cursor % backgrounds.length];
	};
}

const swap = <T,>(items: T[], i: number, j: number) => ([items[i], items[j]] = [items[j], items[i]]);

/**
 * Builds an endless feed as a series of shuffled passes over `pool` (a shuffle-bag), so every quote
 * appears once per pass, the start of a pass doesn't repeat the end of the previous one, and the same
 * character rarely appears twice in a row.
 */
export function createFeedEngine(pool: readonly Quote[], seed = Date.now()) {
	const random = mulberry32(seed);
	const pickBackground = createBackgroundPicker(random);
	const lookback = Math.min(MAX_LOOKBACK, Math.floor(pool.length / 2));
	const finite = pool.length < MIN_LOOPING_POOL;
	let pass = 0;
	let previous: Quote[] = [];

	function nextPass(): FeedItem[] {
		const order = shuffle([...pool], random);
		const n = order.length;
		const recent = new Set(previous.slice(-lookback).map((q) => q.id));

		// Push quotes seen at the end of the last pass out of the first `lookback` slots.
		for (let i = 0; i < Math.min(lookback, n); i++) {
			if (!recent.has(order[i].id)) continue;
			const start = lookback + Math.floor(random() * (n - lookback));
			for (let k = 0; k < n - lookback; k++) {
				const j = lookback + ((start - lookback + k) % (n - lookback));
				if (!recent.has(order[j].id)) {
					swap(order, i, j);
					break;
				}
			}
		}

		// Break up runs of the same character where another speaker is available later in the pass.
		let prevCharacter = previous.at(-1)?.saidBy;
		for (let i = 0; i < n; i++) {
			if (order[i].saidBy === prevCharacter) {
				for (let j = i + 1; j < n; j++) {
					if (order[j].saidBy !== prevCharacter && (i >= lookback || !recent.has(order[j].id))) {
						swap(order, i, j);
						break;
					}
				}
			}
			prevCharacter = order[i].saidBy;
		}

		previous = order;
		const p = pass++;
		return order.map((quote) => ({ key: `${p}:${quote.id}`, quote, background: pickBackground(quote.saidBy) }));
	}

	return { nextPass, finite };
}

export type FeedEngine = ReturnType<typeof createFeedEngine>;

/** Feed items for a fixed list of quotes (the quote viewer), with the same background rotation. */
export function createFixedFeed(quotes: readonly Quote[], seed = Date.now()): FeedItem[] {
	const pickBackground = createBackgroundPicker(mulberry32(seed));
	return quotes.map((quote) => ({ key: quote.id, quote, background: pickBackground(quote.saidBy) }));
}
