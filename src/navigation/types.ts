import type { NavigatorScreenParams } from "@react-navigation/native";
import type { CharacterId, QuoteId } from "@/data";

export type SeasonsStackParamList = {
	Seasons: undefined;
	Season: { season: number };
};

export type CharactersStackParamList = {
	Characters: undefined;
	Character: { characterId: CharacterId };
};

export type FavoritesStackParamList = {
	FavoritesList: undefined;
};

export type TabParamList = {
	Feed: undefined;
	SeasonsTab: NavigatorScreenParams<SeasonsStackParamList>;
	CharactersTab: NavigatorScreenParams<CharactersStackParamList>;
	FavoritesTab: NavigatorScreenParams<FavoritesStackParamList>;
};

export type RootStackParamList = {
	Tabs: NavigatorScreenParams<TabParamList>;
	Search: undefined;
	QuoteViewer: { quoteIds: QuoteId[]; initialIndex: number; title?: string };
};

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}
