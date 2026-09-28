/** Parsing helpers that turn the loosely formatted API strings into structured fields. */

export interface ParsedEpisodeKey {
	number: number;
	numberEnd?: number;
	title: string;
}

// Matches every key in the data, e.g. "1×01 Extreme Aggressor", "1×02, Compulsion",
// '3×02, "In Name and Blood"', '4×01 "Mayhem"', '4×25/26 "To Hell…And Back"'.
const EPISODE_KEY = /^(\d+)×(\d+)(?:\/(\d+))?[,\s]+(.+)$/u;

export function parseSeasonLabel(label: string): number {
	const match = /^Season (\d+)$/.exec(label);
	if (!match) throw new Error(`Unrecognized season label: ${label}`);
	return Number(match[1]);
}

export function parseEpisodeKey(key: string): ParsedEpisodeKey {
	const match = EPISODE_KEY.exec(key.trim());
	if (!match) throw new Error(`Unrecognized episode key: ${key}`);
	const [, , number, numberEnd, title] = match;
	return {
		number: Number(number),
		numberEnd: numberEnd ? Number(numberEnd) : undefined,
		title: title.trim().replace(/^["“]|["”]$/g, ""),
	};
}

export const episodeCode = (season: number, number: number, numberEnd?: number) =>
	`${season}×${String(number).padStart(2, "0")}${numberEnd ? `/${numberEnd}` : ""}`;

export const episodeId = (season: number, number: number) => `s${season}e${String(number).padStart(2, "0")}`;

/** Raw author strings that need more than the generic rules below (typos, misattributions). */
const AUTHOR_OVERRIDES: Record<string, { author: string; note?: string }> = {
	"Albert Pine – attributed to Pine, but actually by Mason Albert Pike, from his book 'Ex Corde Locutiones: Words from the Heart Spoken of His Dead Brethren'":
		{
			author: "Albert Pike",
			note: "Often attributed to \"Albert Pine\". From Ex Corde Locutiones: Words from the Heart Spoken of His Dead Brethren.",
		},
	"'East from Eden' John Steinbeck (here used in a puzzle by the Keystone Killer)": {
		author: "John Steinbeck",
		note: "From East of Eden. Used in a puzzle by the Keystone Killer.",
	},
	"Mahatma Ghandi": { author: "Mahatma Gandhi" },
	Wordsworth: { author: "William Wordsworth" },
	"Francois de la Roche Foucauld": { author: "François de la Rochefoucauld" },
};

const sentence = (s: string) => {
	const trimmed = s.trim().replace(/^Note:\s*/i, "");
	const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
	return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
};

export function parseAuthor(raw: string): { author: string; note?: string } {
	const override = AUTHOR_OVERRIDES[raw];
	if (override) return override;

	const [firstLine, ...rest] = raw.split("\n");
	let author = firstLine.trim();
	const notes: string[] = [];
	if (rest.length) notes.push(rest.join(" ").trim().replace(/^\((.*)\)\.?$/, "$1"));

	if (/^\(attributed to\)\s*/i.test(author)) {
		author = author.replace(/^\(attributed to\)\s*/i, "");
		notes.unshift("Attribution uncertain");
	}

	const trailing = /^(.*?)\s*\((.+)\)\.?$/.exec(author);
	if (trailing) {
		author = trailing[1];
		notes.unshift(trailing[2]);
	}

	const note = notes.filter(Boolean).map(sentence).join(" ");
	return note ? { author, note } : { author };
}

export const normalizeQuoteText = (text: string) => text.trim().replace(/\s+/g, " ");

/** 32-bit FNV-1a, used to build IDs that stay stable when quotes are reordered or added. */
export function fnv1a(input: string): string {
	let hash = 0x811c9dc5;
	for (let i = 0; i < input.length; i++) {
		hash ^= input.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193);
	}
	return (hash >>> 0).toString(36);
}
