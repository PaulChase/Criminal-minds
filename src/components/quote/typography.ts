/** Font size for the big quote text, stepping down for longer quotes (lengths range ~20–240 chars). */
export function quoteTypography(length: number, screenWidth: number) {
	const scale = Math.min(1, screenWidth / 390);
	const [fontSize, lineHeight] = length <= 60 ? [32, 42] : length <= 110 ? [28, 38] : length <= 170 ? [24, 33] : [21, 29];
	return { fontSize: Math.round(fontSize * scale), lineHeight: Math.round(lineHeight * scale) };
}
