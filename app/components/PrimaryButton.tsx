import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface PrimaryButtonProps {
	text: string;
	handlePress: () => void;
	classes?: string;
	disabled?: boolean;
}

export default function PrimaryButton({ text, handlePress, classes, disabled }: PrimaryButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={handlePress}
			className={`bg-amber-600 px-4 py-4 rounded-full ${classes}`}
			disabled={disabled}
		>
			<Text className=" text-white text-center font-bold ">{text}</Text>
		</TouchableOpacity>
	);
}
