import { CHARACTER_IMAGES, CHARACTER_META } from "./characters";
import {
	episodeCode,
	episodeId,
	fnv1a,
	normalizeQuoteText,
	parseAuthor,
	parseEpisodeKey,
	parseSeasonLabel,
} from "./parse";
import { rawQuotes } from "./quotes.raw";
import {
	CHARACTER_IDS,
	type Character,
	type CharacterId,
	type Episode,
	type EpisodeSection,
	type Quote,
	type QuoteId,
	type RawQuoteData,
	type Season,
} from "./types";

export * from "./types";

const isCharacterId = (id: string): id is CharacterId => (CHARACTER_IDS as readonly string[]).includes(id);

function build(data: RawQuoteData) {
	const quotes: Quote[] = [];
	const seasons: Season[] = [];

	const seasonEntries = Object.entries(data)
		.map(([label, episodes]) => ({ label, number: parseSeasonLabel(label), episodes }))
		.sort((a, b) => a.number - b.number);

	for (const { label, number: season, episodes: rawEpisodes } of seasonEntries) {
		const episodes = Object.entries(rawEpisodes)
			.map(([key, rawList]) => ({ ...parseEpisodeKey(key), rawList }))
			.sort((a, b) => a.number - b.number)
			.map(({ number, numberEnd, title, rawList }): Episode => {
				const id = episodeId(season, number);
				const code = episodeCode(season, number, numberEnd);
				const episodeQuotes = rawList.map((raw, i): Quote => {
					if (!isCharacterId(raw.saidBy)) throw new Error(`Unknown character "${raw.saidBy}" in ${code}`);
					const text = normalizeQuoteText(raw.text);
					const { author, note } = parseAuthor(raw.author);
					return {
						id: `${id}-${fnv1a(text.toLowerCase())}`,
						text,
						author,
						authorNote: note,
						saidBy: raw.saidBy,
						season,
						episodeId: id,
						episodeCode: code,
						episodeTitle: title,
						order: quotes.length + i,
					};
				});
				quotes.push(...episodeQuotes);
				return { id, season, number, numberEnd, code, title, quotes: episodeQuotes };
			});

		seasons.push({ number: season, label, episodes, quoteCount: episodes.reduce((n, e) => n + e.quotes.length, 0) });
	}

	return { quotes, seasons };
}

const built = build(rawQuotes);

/** Every quote, in broadcast order. */
export const QUOTES: readonly Quote[] = Object.freeze(built.quotes);
export const SEASONS: readonly Season[] = Object.freeze(built.seasons);

const QUOTE_BY_ID = new Map(QUOTES.map((q) => [q.id, q]));
const EPISODE_BY_ID = new Map(SEASONS.flatMap((s) => s.episodes).map((e) => [e.id, e]));

export const CHARACTERS: readonly Character[] = Object.freeze(
	CHARACTER_IDS.map(
		(id): Character => ({
			id,
			...CHARACTER_META[id],
			...CHARACTER_IMAGES[id],
			quoteCount: QUOTES.filter((q) => q.saidBy === id).length,
		})
	)
);
const CHARACTER_BY_ID = new Map(CHARACTERS.map((c) => [c.id, c]));

if (__DEV__) {
	const episodes = SEASONS.reduce((n, s) => n + s.episodes.length, 0);
	if (QUOTES.length !== 281 || episodes !== 153 || SEASONS.length !== 7) {
		console.warn(`[data] Expected 281 quotes / 153 episodes / 7 seasons, got ${QUOTES.length} / ${episodes} / ${SEASONS.length}`);
	}
	if (QUOTE_BY_ID.size !== QUOTES.length) console.warn("[data] Duplicate quote IDs — two quotes share the same text in one episode.");
}

export const getQuote = (id: QuoteId) => QUOTE_BY_ID.get(id);
export const getQuotes = (ids: readonly QuoteId[]) => ids.map(getQuote).filter((q): q is Quote => q !== undefined);
export const getEpisode = (id: string) => EPISODE_BY_ID.get(id);
export const getSeason = (number: number) => SEASONS.find((s) => s.number === number);
export const getCharacter = (id: CharacterId) => CHARACTER_BY_ID.get(id)!;

export function getSeasonSections(season: number): EpisodeSection[] {
	return (getSeason(season)?.episodes ?? []).filter((e) => e.quotes.length > 0).map((episode) => ({ episode, data: episode.quotes }));
}

export function getCharacterSections(id: CharacterId): EpisodeSection[] {
	const sections: EpisodeSection[] = [];
	for (const season of SEASONS) {
		for (const episode of season.episodes) {
			const data = episode.quotes.filter((q) => q.saidBy === id);
			if (data.length) sections.push({ episode, data });
		}
	}
	return sections;
}

/** Quotes that feed the home swiper; an empty filter means everyone. */
export const getFeedPool = (characters: readonly CharacterId[]) =>
	characters.length ? QUOTES.filter((q) => characters.includes(q.saidBy)) : QUOTES;

/** "S1 · E01" style label, e.g. for chips. */
export function formatEpisodeShort(quote: Pick<Quote, "season" | "episodeCode">) {
	const episode = quote.episodeCode.split("×")[1];
	return `S${quote.season} · E${episode}`;
}
