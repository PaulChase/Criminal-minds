import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { FlatList, View } from "react-native";
import { QuoteRow } from "@/components/quote/QuoteRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { getQuotes } from "@/data";
import { useFavorites } from "@/features/favorites/favoritesStore";
import { useOpenQuoteViewer } from "@/navigation/useOpenQuoteViewer";

export function FavoritesScreen() {
	const favorites = useFavorites((s) => s.favorites);
	const navigation = useNavigation();
	const quotes = useMemo(
		() => getQuotes(Object.entries(favorites).sort(([, a], [, b]) => b - a).map(([id]) => id)),
		[favorites]
	);
	const open = useOpenQuoteViewer(quotes, "Favorites");

	if (quotes.length === 0) {
		return (
			<Screen>
				<EmptyState icon="heart-outline" title="No favorites yet" message="Tap the heart, or double-tap a quote in the feed, to keep it here.">
					<PrimaryButton title="Go to the feed" icon="flame" className="mt-3" onPress={() => navigation.navigate("Tabs", { screen: "Feed" })} />
				</EmptyState>
			</Screen>
		);
	}

	return (
		<Screen>
			<FlatList
				data={quotes}
				keyExtractor={(q) => q.id}
				renderItem={({ item, index }) => <QuoteRow quote={item} index={index} onPress={open} />}
				ItemSeparatorComponent={() => <View className="h-3" />}
				contentContainerClassName="py-4"
			/>
		</Screen>
	);
}
