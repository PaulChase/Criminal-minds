import type { ImageSourcePropType } from "react-native";

export const CHARACTER_IDS = ["Gideon", "Hotch", "Morgan", "Reid", "Elle", "JJ", "Prentiss", "Rossi", "Garcia"] as const;

export type CharacterId = (typeof CHARACTER_IDS)[number];

/** Shape of the data copied from the API: season label → episode key → quotes. */
export interface RawQuote {
	text: string;
	author: string;
	saidBy: string;
}
export type RawQuoteData = Record<string, Record<string, RawQuote[]>>;

export type QuoteId = string;

export interface Quote {
	id: QuoteId;
	text: string;
	author: string;
	/** Extra context stripped out of the raw author string, e.g. "This is not a quote but part of a poem." */
	authorNote?: string;
	saidBy: CharacterId;
	season: number;
	episodeId: string;
	/** e.g. "4×25/26" */
	episodeCode: string;
	episodeTitle: string;
	/** Chronological position across the whole show. */
	order: number;
}

export interface Episode {
	id: string;
	season: number;
	number: number;
	numberEnd?: number;
	code: string;
	title: string;
	quotes: readonly Quote[];
}

export interface Season {
	number: number;
	label: string;
	episodes: readonly Episode[];
	quoteCount: number;
}

export interface Character {
	id: CharacterId;
	name: string;
	fullName: string;
	avatar: ImageSourcePropType;
	backgrounds: readonly ImageSourcePropType[];
	quoteCount: number;
}

export interface EpisodeSection {
	episode: Episode;
	data: readonly Quote[];
}
