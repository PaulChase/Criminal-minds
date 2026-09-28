import { CHARACTER_META } from "./characters";
import { QUOTES } from "./index";
import type { CharacterId, Quote } from "./types";

const CHAR_MAP: Record<string, string> = {
	"‘": "'",
	"’": "'",
	"“": '"',
	"”": '"',
	"…": ".",
	"–": "-",
	"—": "-",
};

/**
 * Lowercases, strips accents and unifies punctuation one character at a time, so indexes in the
 * result line up with the original string (needed to highlight matches).
 */
export function normalizeForSearch(input: string): string {
	let out = "";
	for (const ch of input) {
		const mapped = CHAR_MAP[ch] ?? ch.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
		out += mapped.length === ch.length ? mapped : ch;
	}
	return out;
}

export const queryTerms = (query: string) =>
	normalizeForSearch(query)
		.split(/[\s,.;:!?"()]+/)
		.filter(Boolean);

interface IndexedQuote {
	quote: Quote;
	text: string;
	haystack: string;
}

const INDEX: readonly IndexedQuote[] = QUOTES.map((quote) => {
	const text = normalizeForSearch(quote.text);
	const meta = CHARACTER_META[quote.saidBy];
	const haystack = [text, quote.author, quote.authorNote ?? "", quote.episodeTitle, quote.episodeCode, meta.fullName, meta.name]
		.map(normalizeForSearch)
		.join(" \u0000 ");
	return { quote, text, haystack };
});

/** Quotes containing every word of `query`; exact phrase matches in the quote text come first. */
export function searchQuotes(query: string, characters: readonly CharacterId[] = []): Quote[] {
	const terms = queryTerms(query);
	if (!terms.length) return [];
	const phrase = normalizeForSearch(query.trim());

	const matches = INDEX.filter(
		({ quote, haystack }) =>
			(characters.length === 0 || characters.includes(quote.saidBy)) && terms.every((t) => haystack.includes(t))
	);
	const rank = (m: IndexedQuote) => (m.text.includes(phrase) ? 0 : terms.every((t) => m.text.includes(t)) ? 1 : 2);
	return matches.sort((a, b) => rank(a) - rank(b) || a.quote.order - b.quote.order).map((m) => m.quote);
}

/** Splits `text` into plain and highlighted runs for the given search terms. */
export function highlightRuns(text: string, terms: readonly string[]): { text: string; match: boolean }[] {
	if (!terms.length) return [{ text, match: false }];
	const normalized = normalizeForSearch(text);
	const marks = new Array<boolean>(text.length).fill(false);
	for (const term of terms) {
		for (let i = normalized.indexOf(term); i !== -1; i = normalized.indexOf(term, i + term.length)) {
			marks.fill(true, i, i + term.length);
		}
	}
	const runs: { text: string; match: boolean }[] = [];
	for (let i = 0; i < text.length; i++) {
		const last = runs[runs.length - 1];
		if (last && last.match === marks[i]) last.text += text[i];
		else runs.push({ text: text[i], match: marks[i] });
	}
	return runs;
}
