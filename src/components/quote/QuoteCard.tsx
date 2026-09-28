import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import type { Ref } from "react";
import { Image, StyleSheet, Text, View, useWindowDimensions, type ImageSourcePropType } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { formatEpisodeShort, getCharacter, type Quote } from "@/data";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { quoteTypography } from "./typography";

/** Width reserved on the right for the action rail, which sits on top of the card (outside the capture). */
export const ACTION_RAIL_WIDTH = 72;

const TOP_SCRIM = ["rgba(0,0,0,0.55)", "rgba(0,0,0,0)"] as const;
const BOTTOM_SCRIM = ["rgba(0,0,0,0)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.92)"] as const;
const BOTTOM_SCRIM_STOPS = [0, 0.4, 1] as const;

interface QuoteCardProps {
	quote: Quote;
	background: ImageSourcePropType;
	/** Page height; the background needs explicit dimensions (see below). */
	height: number;
	bottomInset?: number;
	ref?: Ref<View>;
}

/**
 * The part of a page that gets saved/shared as an image. Keep buttons and animations out of this
 * tree, and keep it on RN <Image>: view-shot can't draw Android hardware bitmaps (expo-image uses them).
 */
export function QuoteCard({ quote, background, height, bottomInset = 0, ref }: QuoteCardProps) {
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const character = getCharacter(quote.saidBy);
	const type = quoteTypography(quote.text.length, width);

	return (
		<View ref={ref} collapsable={false} style={styles.card}>
			{/* Explicit width/height: on Android (RN 0.86) an Image sized only by absolute insets ignores
			    resizeMode and draws the bitmap at its natural size from the top-left corner. */}
			<Image source={background} resizeMode="cover" fadeDuration={0} style={[styles.background, { width, height }]} />
			<LinearGradient colors={TOP_SCRIM} style={[styles.topScrim, { height: insets.top + 110 }]} />
			<LinearGradient colors={BOTTOM_SCRIM} locations={BOTTOM_SCRIM_STOPS} dither style={styles.bottomScrim} />

			<View style={[styles.content, { paddingBottom: 20 + bottomInset }]}>
				<Text style={styles.quoteMark} maxFontSizeMultiplier={1} accessible={false}>
					{"\u201C"}
				</Text>
				<Text style={[styles.quote, type]} maxFontSizeMultiplier={1.2}>
					{quote.text}
				</Text>
				<Text style={styles.author} maxFontSizeMultiplier={1.3}>
					— {quote.author}
				</Text>
				{quote.authorNote ? (
					<Text style={styles.note} maxFontSizeMultiplier={1.3}>
						{quote.authorNote}
					</Text>
				) : null}

				<View style={styles.chips}>
					<View style={styles.chip}>
						<CharacterAvatar id={quote.saidBy} size={24} />
						<Text style={styles.chipText} numberOfLines={1} maxFontSizeMultiplier={1.2}>
							{character.fullName}
						</Text>
					</View>
					<View style={[styles.chip, styles.chipShrink]}>
						<Ionicons name="film-outline" size={15} color={colors.primaryLight} />
						<Text style={styles.chipText} numberOfLines={1} maxFontSizeMultiplier={1.2}>
							{formatEpisodeShort(quote)} · {quote.episodeTitle}
						</Text>
					</View>
				</View>

				<Text style={styles.watermark} maxFontSizeMultiplier={1}>
					CRIMINAL MINDS · QUOTES
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		backgroundColor: colors.bg,
		overflow: "hidden",
	},
	background: {
		position: "absolute",
		top: 0,
		left: 0,
	},
	topScrim: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	bottomScrim: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: "72%",
	},
	content: {
		flex: 1,
		justifyContent: "flex-end",
		paddingLeft: 22,
		paddingRight: ACTION_RAIL_WIDTH + 6,
		gap: 10,
	},
	quoteMark: {
		color: colors.primary,
		fontFamily: fonts.headingBlack,
		fontSize: 72,
		lineHeight: 72,
		marginBottom: -34,
		marginLeft: -4,
	},
	quote: {
		color: colors.text,
		fontFamily: fonts.semibold,
		textShadowColor: "rgba(0,0,0,0.6)",
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 8,
	},
	author: {
		color: colors.primaryLight,
		fontFamily: fonts.medium,
		fontSize: 16,
	},
	note: {
		color: "rgba(255,255,255,0.7)",
		fontFamily: fonts.regular,
		fontSize: 12,
		lineHeight: 17,
		marginTop: -4,
	},
	chips: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 6,
	},
	chip: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		paddingVertical: 4,
		paddingLeft: 4,
		paddingRight: 10,
		borderRadius: 999,
		backgroundColor: "rgba(255,255,255,0.12)",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "rgba(255,255,255,0.2)",
		maxWidth: "100%",
	},
	chipShrink: {
		paddingLeft: 10,
		flexShrink: 1,
	},
	chipText: {
		color: colors.text,
		fontFamily: fonts.medium,
		fontSize: 12,
		flexShrink: 1,
	},
	watermark: {
		color: "rgba(255,255,255,0.45)",
		fontFamily: fonts.headingBlack,
		fontSize: 10,
		letterSpacing: 3,
		marginTop: 8,
	},
});
