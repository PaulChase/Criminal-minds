import { useNavigation } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { Image, SectionList, StyleSheet, View, useWindowDimensions } from "react-native";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { EpisodeSectionHeader } from "@/components/quote/EpisodeSectionHeader";
import { QuoteRow } from "@/components/quote/QuoteRow";
import { AppText } from "@/components/ui/AppText";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { getCharacter, getCharacterSections } from "@/data";
import { useFeedFilter } from "@/features/filter/feedFilterStore";
import type { CharactersStackParamList } from "@/navigation/types";
import { useOpenQuoteViewer } from "@/navigation/useOpenQuoteViewer";
import { colors } from "@/theme/colors";

type Props = NativeStackScreenProps<CharactersStackParamList, "Character">;

const HERO_HEIGHT = 220;
const HERO_SCRIM = ["rgba(13,13,13,0)", "rgba(13,13,13,0.7)", colors.bg] as const;

export function CharacterScreen({ route }: Props) {
	const navigation = useNavigation();
	const character = getCharacter(route.params.characterId);
	const sections = useMemo(() => getCharacterSections(character.id), [character.id]);
	const quotes = useMemo(() => sections.flatMap((s) => s.data), [sections]);
	const indexById = useMemo(() => new Map(quotes.map((q, i) => [q.id, i])), [quotes]);
	const open = useOpenQuoteViewer(quotes, character.fullName);
	const seasonCount = new Set(quotes.map((q) => q.season)).size;
	const { width } = useWindowDimensions();

	const playInFeed = () => {
		useFeedFilter.getState().setCharacters([character.id]);
		navigation.navigate("Tabs", { screen: "Feed" });
	};

	return (
		<Screen>
			<SectionList
				sections={sections}
				keyExtractor={(q) => q.id}
				stickySectionHeadersEnabled={false}
				ListHeaderComponent={
					<View className="mb-2">
						<View style={styles.hero}>
							{/* Full 9:16 image shifted up, so the banner shows the face rather than the center of the photo.
							    Explicit size also makes Android honor resizeMode (see QuoteCard). */}
							<Image
								source={character.backgrounds[0]}
								resizeMode="cover"
								style={{ position: "absolute", width, height: (width * 16) / 9, top: -((width * 16) / 9) * 0.1 }}
							/>
							<LinearGradient colors={HERO_SCRIM} locations={[0.3, 0.75, 1]} style={StyleSheet.absoluteFill} />
						</View>
						<View className="-mt-16 items-center gap-2 px-6">
							<CharacterAvatar id={character.id} size={96} style={{ borderWidth: 3, borderColor: colors.primary }} />
							<AppText className="text-center font-heading-black text-2xl">{character.fullName}</AppText>
							<AppText className="text-muted">
								{character.quoteCount} {character.quoteCount === 1 ? "quote" : "quotes"} · {seasonCount} {seasonCount === 1 ? "season" : "seasons"}
							</AppText>
							<PrimaryButton title="Swipe in feed" icon="play" onPress={playInFeed} className="mt-2" />
						</View>
					</View>
				}
				renderSectionHeader={({ section }) => <EpisodeSectionHeader episode={section.episode} count={section.data.length} />}
				renderItem={({ item }) => <QuoteRow quote={item} index={indexById.get(item.id)!} onPress={open} showCharacter={false} showEpisode={false} />}
				ItemSeparatorComponent={() => <View className="h-3" />}
				contentContainerClassName="pb-8"
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	hero: { height: HERO_HEIGHT, overflow: "hidden" },
});
