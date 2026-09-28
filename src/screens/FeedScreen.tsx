import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CharacterAvatar } from "@/components/character/CharacterAvatar";
import { CharacterFilterSheet } from "@/components/character/CharacterFilterSheet";
import { FeedEndCard } from "@/components/quote/FeedEndCard";
import { QuotePager } from "@/components/quote/QuotePager";
import { IconButton } from "@/components/ui/IconButton";
import { getCharacter, type CharacterId } from "@/data";
import { useFeed } from "@/features/feed/useFeed";
import { useFeedFilter } from "@/features/filter/feedFilterStore";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export function FeedScreen() {
	const characters = useFeedFilter((s) => s.characters);
	const setCharacters = useFeedFilter((s) => s.setCharacters);
	const [filterOpen, setFilterOpen] = useState(false);
	const insets = useSafeAreaInsets();
	const navigation = useNavigation();

	return (
		<View style={styles.screen}>
			{/* Remount on filter change so the feed restarts from the top with a fresh shuffle. */}
			<Feed key={characters.join(",") || "all"} characters={characters} onShowAll={() => setCharacters([])} />

			<View style={[styles.topBar, { top: insets.top + 6 }]} pointerEvents="box-none">
				<FilterPill characters={characters} onPress={() => setFilterOpen(true)} />
				<IconButton icon="search" accessibilityLabel="Search quotes" onPress={() => navigation.navigate("Search")} style={styles.roundButton} />
			</View>

			<CharacterFilterSheet visible={filterOpen} selected={characters} onApply={setCharacters} onClose={() => setFilterOpen(false)} />
		</View>
	);
}

function Feed({ characters, onShowAll }: { characters: readonly CharacterId[]; onShowAll: () => void }) {
	const { items, loadMore, finite } = useFeed(characters);
	const names = characters.map((id) => getCharacter(id).name).join(" & ");
	return (
		<QuotePager
			items={items}
			onEndReached={loadMore}
			renderFooter={finite ? (height) => <FeedEndCard height={height} title={`That's every ${names} quote`} onShowAll={onShowAll} /> : undefined}
		/>
	);
}

function FilterPill({ characters, onPress }: { characters: readonly CharacterId[]; onPress: () => void }) {
	const label = characters.length === 0 ? "All characters" : characters.length === 1 ? getCharacter(characters[0]).name : `${characters.length} characters`;
	return (
		<Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Filter feed. Showing ${label}`} style={styles.pill} className="active:opacity-70">
			{characters.length ? (
				<View style={styles.avatars}>
					{characters.slice(0, 3).map((id, i) => (
						<CharacterAvatar key={id} id={id} size={24} style={[styles.stackedAvatar, { marginLeft: i === 0 ? 0 : -8 }]} />
					))}
				</View>
			) : (
				<Ionicons name="people" size={16} color={colors.primaryLight} />
			)}
			<Text style={styles.pillText}>{label}</Text>
			<Ionicons name="chevron-down" size={14} color="white" />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: colors.bg },
	topBar: {
		position: "absolute",
		left: 14,
		right: 14,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	pill: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		paddingVertical: 6,
		paddingLeft: 8,
		paddingRight: 12,
		borderRadius: 999,
		backgroundColor: "rgba(0,0,0,0.45)",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "rgba(255,255,255,0.2)",
	},
	pillText: { color: "white", fontFamily: fonts.medium, fontSize: 13 },
	avatars: { flexDirection: "row" },
	stackedAvatar: { borderWidth: 1.5, borderColor: "rgba(0,0,0,0.6)" },
	roundButton: { backgroundColor: "rgba(0,0,0,0.45)" },
});
