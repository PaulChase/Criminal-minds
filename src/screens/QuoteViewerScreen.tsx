import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { QuotePager } from "@/components/quote/QuotePager";
import { IconButton } from "@/components/ui/IconButton";
import { getQuotes } from "@/data";
import { createFixedFeed } from "@/features/feed/feedEngine";
import type { RootStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

type Props = NativeStackScreenProps<RootStackParamList, "QuoteViewer">;

export function QuoteViewerScreen({ route, navigation }: Props) {
	const { quoteIds, initialIndex, title } = route.params;
	const insets = useSafeAreaInsets();
	const items = useMemo(() => createFixedFeed(getQuotes(quoteIds)), [quoteIds]);

	return (
		<View style={styles.screen}>
			<QuotePager items={items} initialIndex={initialIndex} bottomInset={insets.bottom} />
			<View style={[styles.topBar, { top: insets.top + 6 }]} pointerEvents="box-none">
				<IconButton icon="chevron-down" size={24} accessibilityLabel="Close" onPress={() => navigation.goBack()} style={styles.roundButton} />
				{title ? (
					<Text style={styles.title} numberOfLines={1}>
						{title}
					</Text>
				) : null}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: colors.bg },
	topBar: { position: "absolute", left: 14, right: 14, flexDirection: "row", alignItems: "center", gap: 10 },
	roundButton: { backgroundColor: "rgba(0,0,0,0.45)" },
	title: {
		flexShrink: 1,
		color: "white",
		fontFamily: fonts.semibold,
		fontSize: 15,
		textShadowColor: "rgba(0,0,0,0.6)",
		textShadowRadius: 6,
	},
});
