// [max quote length, font size, line height]; quotes run from ~20 to ~440 characters (the FBI oath).
const STEPS: [number, number, number][] = [
	[60, 32, 42],
	[110, 28, 38],
	[170, 24, 33],
	[240, 21, 29],
	[340, 19, 26],
	[Infinity, 17, 23],
];

/** Font size for the big quote text, stepping down for longer quotes. */
export function quoteTypography(length: number, screenWidth: number) {
	const scale = Math.min(1, screenWidth / 390);
	const [, fontSize, lineHeight] = STEPS.find(([max]) => length <= max)!;
	return { fontSize: Math.round(fontSize * scale), lineHeight: Math.round(lineHeight * scale) };
}
