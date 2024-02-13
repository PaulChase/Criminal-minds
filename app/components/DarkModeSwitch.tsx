import React from "react";
import { Pressable, Switch, View } from "react-native";
import { useColorScheme } from "nativewind";

export default function DarkModeSwitch() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<Pressable onPress={toggleColorScheme}>
			<Switch
				value={colorScheme === "dark"}
				onValueChange={() => toggleColorScheme()}
				trackColor={{ false: "#767577", true: "amber" }}
			/>
		</Pressable>
	);
}
