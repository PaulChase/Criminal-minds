import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import type { Episode } from "@/data";

export function EpisodeSectionHeader({ episode, count, showSeason = false }: { episode: Episode; count: number; showSeason?: boolean }) {
	return (
		<View className="flex-row items-baseline gap-2 bg-bg px-4 pb-2 pt-5">
			<AppText className="font-heading-black text-sm text-primary-light">{episode.code}</AppText>
			<AppText className="flex-1 font-text-semibold" numberOfLines={1}>
				{episode.title}
			</AppText>
			<AppText className="text-xs text-muted">
				{showSeason ? `Season ${episode.season} · ` : ""}
				{count} {count === 1 ? "quote" : "quotes"}
			</AppText>
		</View>
	);
}
