import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable } from "react-native";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { CHARACTERS } from "@/data";
import type { CharactersStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<CharactersStackParamList, "Characters">;

export function CharactersScreen({ navigation }: Props) {
	return (
		<Screen>
			<FlatList
				data={CHARACTERS}
				keyExtractor={(c) => c.id}
				numColumns={2}
				contentContainerClassName="gap-3 p-4"
				columnWrapperClassName="gap-3"
				renderItem={({ item }) => (
					<Pressable
						onPress={() => navigation.navigate("Character", { characterId: item.id })}
						accessibilityRole="button"
						accessibilityLabel={`${item.fullName}, ${item.quoteCount} quotes`}
						className="flex-1 items-center gap-3 rounded-2xl bg-surface px-3 py-5 active:opacity-80"
					>
						<CharacterAvatar id={item.id} size={88} style={{ borderWidth: 2, borderColor: "#d97706" }} />
						<AppText className="text-center font-text-semibold" numberOfLines={1}>
							{item.fullName}
						</AppText>
						<AppText className="-mt-2 text-xs text-muted">
							{item.quoteCount} {item.quoteCount === 1 ? "quote" : "quotes"}
						</AppText>
					</Pressable>
				)}
			/>
		</Screen>
	);
}
