import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDeferredValue, useMemo, useState } from "react";
import { FlatList, Pressable, ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { QuoteRow } from "@/components/quote/QuoteRow";
import { AppText } from "@/components/ui/AppText";
import { EmptyState } from "@/components/ui/EmptyState";
import { IconButton } from "@/components/ui/IconButton";
import { Screen } from "@/components/ui/Screen";
import { cn } from "@/components/ui/cn";
import { CHARACTERS, type CharacterId } from "@/data";
import { queryTerms, searchQuotes } from "@/data/search";
import type { RootStackParamList } from "@/navigation/types";
import { useOpenQuoteViewer } from "@/navigation/useOpenQuoteViewer";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

const SUGGESTIONS = ["abyss", "Nietzsche", "fear", "truth", "love", "evil"];

export function SearchScreen({ navigation }: Props) {
	const insets = useSafeAreaInsets();
	const [query, setQuery] = useState("");
	const [characters, setCharacters] = useState<CharacterId[]>([]);
	const deferredQuery = useDeferredValue(query);

	const results = useMemo(() => searchQuotes(deferredQuery, characters), [deferredQuery, characters]);
	const terms = useMemo(() => queryTerms(deferredQuery), [deferredQuery]);
	const open = useOpenQuoteViewer(results, `Search: ${deferredQuery.trim()}`);

	const toggleCharacter = (id: CharacterId) => setCharacters((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

	return (
		<Screen style={{ paddingTop: insets.top }}>
			<View className="flex-row items-center gap-1 px-2 pb-2 pt-1">
				<IconButton icon="chevron-back" size={26} accessibilityLabel="Back" onPress={() => navigation.goBack()} />
				<View className="h-11 flex-1 flex-row items-center gap-2 rounded-full bg-surface px-4">
					<Ionicons name="search" size={18} color={colors.muted} />
					<TextInput
						value={query}
						onChangeText={setQuery}
						autoFocus
						placeholder="Search quotes, authors, episodes"
						placeholderTextColor={colors.muted}
						returnKeyType="search"
						autoCorrect={false}
						selectionColor={colors.primary}
						style={{ flex: 1, color: colors.text, fontFamily: fonts.regular, fontSize: 15, paddingVertical: 0 }}
						accessibilityLabel="Search quotes"
					/>
					{query ? <IconButton icon="close-circle" size={18} color={colors.muted} accessibilityLabel="Clear search" onPress={() => setQuery("")} /> : null}
				</View>
			</View>

			<View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerClassName="gap-2 px-4 pb-3">
					{CHARACTERS.map((c) => {
						const active = characters.includes(c.id);
						return (
							<Pressable
								key={c.id}
								onPress={() => toggleCharacter(c.id)}
								accessibilityRole="checkbox"
								accessibilityState={{ checked: active }}
								accessibilityLabel={`Only ${c.fullName}`}
								className={cn("flex-row items-center gap-1.5 rounded-full border py-1 pl-1 pr-3", active ? "border-primary bg-primary/20" : "border-border bg-surface")}
							>
								<CharacterAvatar id={c.id} size={22} />
								<AppText className="font-text-medium text-xs">{c.name}</AppText>
							</Pressable>
						);
					})}
				</ScrollView>
			</View>

			{terms.length === 0 ? (
				<View className="gap-3 px-4 pt-6">
					<AppText className="text-sm text-muted">Try searching for</AppText>
					<View className="flex-row flex-wrap gap-2">
						{SUGGESTIONS.map((s) => (
							<Pressable key={s} onPress={() => setQuery(s)} className="rounded-full bg-surface px-4 py-2 active:opacity-70">
								<AppText className="text-sm">{s}</AppText>
							</Pressable>
						))}
					</View>
				</View>
			) : results.length === 0 ? (
				<EmptyState icon="search" title="No quotes found" message={`Nothing matches “${deferredQuery.trim()}”${characters.length ? " for the selected characters" : ""}.`} />
			) : (
				<FlatList
					data={results}
					keyExtractor={(q) => q.id}
					keyboardShouldPersistTaps="handled"
					keyboardDismissMode="on-drag"
					ListHeaderComponent={
						<AppText className="px-4 pb-3 text-xs text-muted">
							{results.length} {results.length === 1 ? "quote" : "quotes"}
						</AppText>
					}
					renderItem={({ item, index }) => <QuoteRow quote={item} index={index} onPress={open} highlight={terms} />}
					ItemSeparatorComponent={() => <View className="h-3" />}
					contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
				/>
			)}
		</Screen>
	);
}
