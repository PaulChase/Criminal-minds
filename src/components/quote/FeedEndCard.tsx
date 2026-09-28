import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { AppText } from "@/components/ui/AppText";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { colors } from "@/theme/colors";

interface FeedEndCardProps {
	height: number;
	title: string;
	onShowAll: () => void;
}

export function FeedEndCard({ height, title, onShowAll }: FeedEndCardProps) {
	return (
		<View style={{ height }} className="items-center justify-center gap-4 bg-bg px-10">
			<Ionicons name="checkmark-done-circle-outline" size={64} color={colors.primary} />
			<AppText className="text-center font-text-semibold text-xl">{title}</AppText>
			<AppText className="text-center text-muted">Add more characters to keep swiping.</AppText>
			<PrimaryButton title="Show all characters" icon="people" onPress={onShowAll} className="mt-2" />
		</View>
	);
}
