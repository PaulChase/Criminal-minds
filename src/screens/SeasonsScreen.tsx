import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, Pressable, View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { Screen } from "@/components/ui/Screen";
import { SEASONS } from "@/data";
import type { SeasonsStackParamList } from "@/navigation/types";
import { colors } from "@/theme/colors";

type Props = NativeStackScreenProps<SeasonsStackParamList, "Seasons">;

export function SeasonsScreen({ navigation }: Props) {
	return (
		<Screen>
			<FlatList
				data={SEASONS}
				keyExtractor={(s) => String(s.number)}
				contentContainerClassName="gap-3 p-4"
				renderItem={({ item }) => (
					<Pressable
						onPress={() => navigation.navigate("Season", { season: item.number })}
						accessibilityRole="button"
						accessibilityLabel={`${item.label}, ${item.episodes.length} episodes, ${item.quoteCount} quotes`}
						className="flex-row items-center gap-4 rounded-2xl bg-surface p-4 active:opacity-80"
					>
						<View className="h-14 w-14 items-center justify-center rounded-xl bg-primary/20">
							<AppText className="font-heading-black text-2xl text-primary-light">{item.number}</AppText>
						</View>
						<View className="flex-1 gap-1">
							<AppText className="font-text-semibold text-lg">{item.label}</AppText>
							<AppText className="text-sm text-muted">
								{item.episodes.length} episodes · {item.quoteCount} quotes
							</AppText>
						</View>
						<Ionicons name="chevron-forward" size={20} color={colors.muted} />
					</Pressable>
				)}
			/>
		</Screen>
	);
}
