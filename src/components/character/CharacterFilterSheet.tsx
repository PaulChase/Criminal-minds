import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { Modal, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppText } from "@/components/ui/AppText";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { cn } from "@/components/ui/cn";
import { CHARACTERS, type CharacterId } from "@/data";
import { colors } from "@/theme/colors";
import { CharacterAvatar } from "./CharacterAvatar";

interface CharacterFilterSheetProps {
	visible: boolean;
	selected: readonly CharacterId[];
	onApply: (characters: CharacterId[]) => void;
	onClose: () => void;
}

export function CharacterFilterSheet({ visible, selected, onApply, onClose }: CharacterFilterSheetProps) {
	const insets = useSafeAreaInsets();
	const [draft, setDraft] = useState<CharacterId[]>([...selected]);

	useEffect(() => {
		if (visible) setDraft([...selected]);
	}, [visible, selected]);

	const toggle = (id: CharacterId) => setDraft((d) => (d.includes(id) ? d.filter((c) => c !== id) : [...d, id]));

	return (
		<Modal visible={visible} transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
			<Pressable className="flex-1 bg-black/60" onPress={onClose} accessibilityLabel="Close filter" />
			<View className="rounded-t-3xl bg-surface px-5 pt-3" style={{ paddingBottom: insets.bottom + 16 }}>
				<View className="mb-4 h-1 w-10 self-center rounded-full bg-border" />
				<View className="mb-1 flex-row items-center justify-between">
					<AppText className="font-text-semibold text-lg">Filter the feed</AppText>
					<Pressable onPress={() => setDraft([])} hitSlop={10} accessibilityRole="button">
						<AppText className="font-text-medium text-primary-light">Clear</AppText>
					</Pressable>
				</View>
				<AppText className="mb-4 text-sm text-muted">Pick the characters whose quotes you want to swipe through.</AppText>

				<View className="flex-row flex-wrap gap-2">
					{CHARACTERS.map((c) => {
						const active = draft.includes(c.id);
						return (
							<Pressable
								key={c.id}
								onPress={() => toggle(c.id)}
								accessibilityRole="checkbox"
								accessibilityState={{ checked: active }}
								accessibilityLabel={`${c.fullName}, ${c.quoteCount} quotes`}
								className={cn(
									"flex-row items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-3",
									active ? "border-primary bg-primary/20" : "border-border bg-surface-2"
								)}
							>
								<CharacterAvatar id={c.id} size={28} />
								<AppText className="font-text-medium text-sm">{c.name}</AppText>
								<AppText className="text-xs text-muted">{c.quoteCount}</AppText>
								{active ? <Ionicons name="checkmark" size={16} color={colors.primaryLight} /> : null}
							</Pressable>
						);
					})}
				</View>

				<PrimaryButton
					className="mt-6"
					title={draft.length ? `Show ${draft.length === 1 ? "1 character" : `${draft.length} characters`}` : "Show everyone"}
					onPress={() => {
						onApply(draft);
						onClose();
					}}
				/>
			</View>
		</Modal>
	);
}
