import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { AppText } from "@/components/ui/AppText";
import { formatEpisodeShort, getCharacter, type Quote } from "@/data";
import { highlightRuns } from "@/data/search";
import { FavoriteButton } from "./FavoriteButton";

interface QuoteRowProps {
	quote: Quote;
	index: number;
	onPress: (index: number) => void;
	/** Show who said it (season/search/favorites lists) and/or the episode (character/search/favorites lists). */
	showCharacter?: boolean;
	showEpisode?: boolean;
	highlight?: readonly string[];
}

export const QuoteRow = memo(function QuoteRow({ quote, index, onPress, showCharacter = true, showEpisode = true, highlight = [] }: QuoteRowProps) {
	return (
		<Pressable
			onPress={() => onPress(index)}
			accessibilityRole="button"
			accessibilityHint="Opens the quote full screen"
			className="mx-4 gap-3 rounded-2xl bg-surface p-4 active:opacity-80"
		>
			<AppText className="font-text-medium text-[15px] leading-6">
				{highlight.length
					? highlightRuns(quote.text, highlight).map((run, i) =>
							run.match ? (
								<Text key={i} className="text-primary-light">
									{run.text}
								</Text>
							) : (
								run.text
							)
						)
					: quote.text}
			</AppText>
			<AppText className="text-sm text-primary-light">— {quote.author}</AppText>

			<View className="flex-row items-center gap-3">
				{showCharacter ? (
					<View className="flex-row items-center gap-2">
						<CharacterAvatar id={quote.saidBy} size={22} />
						<AppText className="font-text-medium text-xs">{getCharacter(quote.saidBy).name}</AppText>
					</View>
				) : null}
				{showEpisode ? (
					<AppText className="flex-1 text-xs text-muted" numberOfLines={1}>
						{formatEpisodeShort(quote)} · {quote.episodeTitle}
					</AppText>
				) : (
					<View className="flex-1" />
				)}
				<FavoriteButton id={quote.id} size={20} />
			</View>
		</Pressable>
	);
});
