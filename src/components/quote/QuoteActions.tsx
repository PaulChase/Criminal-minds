import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps, ReactNode, RefObject } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Quote } from "@/data";
import { useQuoteActions } from "@/features/share/useQuoteActions";
import { fonts } from "@/theme/fonts";
import { FavoriteButton } from "./FavoriteButton";
import { ACTION_RAIL_WIDTH } from "./QuoteCard";

interface QuoteActionsProps {
	quote: Quote;
	cardRef: RefObject<View | null>;
	bottomInset?: number;
}

/** Vertical action rail on the right of a feed page. Rendered over the card, never captured. */
export function QuoteActions({ quote, cardRef, bottomInset = 0 }: QuoteActionsProps) {
	const { save, share, copy } = useQuoteActions(quote, cardRef);
	return (
		<View style={[styles.rail, { bottom: 64 + bottomInset }]} pointerEvents="box-none">
			<RailItem label="Like">
				<FavoriteButton id={quote.id} size={28} color="white" />
			</RailItem>
			<RailButton icon="paper-plane-outline" label="Share" onPress={share} />
			<RailButton icon="download-outline" label="Save" onPress={save} />
			<RailButton icon="copy-outline" label="Copy" onPress={copy} />
		</View>
	);
}

function RailItem({ label, children }: { label: string; children: ReactNode }) {
	return (
		<View style={styles.item}>
			<View style={styles.circle}>{children}</View>
			<Text style={styles.label} maxFontSizeMultiplier={1.2}>
				{label}
			</Text>
		</View>
	);
}

function RailButton({ icon, label, onPress }: { icon: ComponentProps<typeof Ionicons>["name"]; label: string; onPress: () => void }) {
	return (
		<Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label} style={styles.item} className="active:opacity-60">
			<View style={styles.circle}>
				<Ionicons name={icon} size={25} color="white" />
			</View>
			<Text style={styles.label} maxFontSizeMultiplier={1.2}>
				{label}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	rail: {
		position: "absolute",
		right: 0,
		width: ACTION_RAIL_WIDTH,
		alignItems: "center",
		gap: 14,
	},
	item: {
		alignItems: "center",
		gap: 3,
	},
	circle: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.35)",
	},
	label: {
		color: "white",
		fontFamily: fonts.medium,
		fontSize: 11,
		textShadowColor: "rgba(0,0,0,0.6)",
		textShadowRadius: 4,
	},
});
