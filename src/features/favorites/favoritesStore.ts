import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getQuote, type QuoteId } from "@/data";

interface FavoritesState {
	/** Quote ID → time it was favorited (ms). */
	favorites: Record<QuoteId, number>;
	add: (id: QuoteId) => void;
	/** Returns true if the quote is now a favorite. */
	toggle: (id: QuoteId) => boolean;
}

export const useFavorites = create<FavoritesState>()(
	persist(
		(set, get) => ({
			favorites: {},
			add: (id) => {
				if (get().favorites[id]) return;
				set((s) => ({ favorites: { ...s.favorites, [id]: Date.now() } }));
			},
			toggle: (id) => {
				const { [id]: existing, ...rest } = get().favorites;
				set({ favorites: existing ? rest : { ...rest, [id]: Date.now() } });
				return !existing;
			},
		}),
		{
			name: "cm.favorites.v1",
			version: 1,
			storage: createJSONStorage(() => AsyncStorage),
			partialize: (s) => ({ favorites: s.favorites }),
			// Drop favorites whose quote no longer exists (e.g. its text was edited, which changes the ID).
			merge: (persisted, current) => {
				const saved = (persisted as Partial<FavoritesState> | undefined)?.favorites ?? {};
				const favorites = Object.fromEntries(Object.entries(saved).filter(([id]) => getQuote(id)));
				return { ...current, favorites };
			},
		}
	)
);

export const useIsFavorite = (id: QuoteId) => useFavorites((s) => s.favorites[id] !== undefined);
