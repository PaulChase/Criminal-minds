import { characterImages } from "./characterImages.generated";
import type { CharacterId } from "./types";

export interface CharacterMeta {
	name: string;
	fullName: string;
}

export const CHARACTER_META = {
	Gideon: { name: "Gideon", fullName: "Jason Gideon" },
	Hotch: { name: "Hotch", fullName: "Aaron Hotchner" },
	Morgan: { name: "Morgan", fullName: "Derek Morgan" },
	Reid: { name: "Reid", fullName: "Dr. Spencer Reid" },
	Elle: { name: "Elle", fullName: "Elle Greenaway" },
	JJ: { name: "JJ", fullName: "Jennifer “JJ” Jareau" },
	Prentiss: { name: "Prentiss", fullName: "Emily Prentiss" },
	Rossi: { name: "Rossi", fullName: "David Rossi" },
	Garcia: { name: "Garcia", fullName: "Penelope Garcia" },
} satisfies Record<CharacterId, CharacterMeta>;

// A type error here means a character is missing its folder in assets/characters — run `npm run images`.
export const CHARACTER_IMAGES: Record<CharacterId, (typeof characterImages)[CharacterId]> = characterImages;
