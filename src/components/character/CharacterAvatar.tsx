import { Image, type StyleProp, type ImageStyle } from "react-native";
import { getCharacter, type CharacterId } from "@/data";

interface CharacterAvatarProps {
	id: CharacterId;
	size?: number;
	style?: StyleProp<ImageStyle>;
}

export function CharacterAvatar({ id, size = 32, style }: CharacterAvatarProps) {
	return (
		<Image
			source={getCharacter(id).avatar}
			fadeDuration={0}
			style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: "#333" }, style]}
			accessibilityIgnoresInvertColors
		/>
	);
}
