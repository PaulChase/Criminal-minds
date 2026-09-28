import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { SectionList, View } from "react-native";
import { EpisodeSectionHeader } from "@/components/quote/EpisodeSectionHeader";
import { QuoteRow } from "@/components/quote/QuoteRow";
import { Screen } from "@/components/ui/Screen";
import { getSeasonSections } from "@/data";
import type { SeasonsStackParamList } from "@/navigation/types";
import { useOpenQuoteViewer } from "@/navigation/useOpenQuoteViewer";

type Props = NativeStackScreenProps<SeasonsStackParamList, "Season">;

export function SeasonScreen({ route }: Props) {
	const { season } = route.params;
	const sections = useMemo(() => getSeasonSections(season), [season]);
	const quotes = useMemo(() => sections.flatMap((s) => s.data), [sections]);
	const indexById = useMemo(() => new Map(quotes.map((q, i) => [q.id, i])), [quotes]);
	const open = useOpenQuoteViewer(quotes, `Season ${season}`);

	return (
		<Screen>
			<SectionList
				sections={sections}
				keyExtractor={(q) => q.id}
				stickySectionHeadersEnabled
				renderSectionHeader={({ section }) => <EpisodeSectionHeader episode={section.episode} count={section.data.length} />}
				renderItem={({ item }) => <QuoteRow quote={item} index={indexById.get(item.id)!} onPress={open} showEpisode={false} />}
				ItemSeparatorComponent={() => <View className="h-3" />}
				contentContainerClassName="pb-8"
			/>
		</Screen>
	);
}
