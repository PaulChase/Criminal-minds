import { create } from "zustand";
import type { CharacterId } from "@/data";

interface FeedFilterState {
	/** Characters shown in the home feed; empty means everyone. Session only, not persisted. */
	characters: CharacterId[];
	setCharacters: (characters: CharacterId[]) => void;
}

export const useFeedFilter = create<FeedFilterState>((set) => ({
	characters: [],
	setCharacters: (characters) => set({ characters }),
}));
