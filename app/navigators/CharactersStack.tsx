import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import constants from "../utils/constants";
import { useColorScheme } from "nativewind";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import EpisodesScreen from "../screens/EpisodesScreen";
import CharactersScreen from "../screens/CharactersScreen";
import CharacterQuotesScreen from "../screens/CharacterQuotes";

const CharactersScreensStack = createStackNavigator();

export default function CharactersStack() {
	const { colorScheme } = useColorScheme();

	return (
		<CharactersScreensStack.Navigator
			screenOptions={() => ({
				headerStyle: {
					backgroundColor: constants.colors.darkComponentBg,
				},
				headerTitleStyle: {
					fontFamily: constants.fonts.text_semibold,
					fontSize: 20,
				},
				headerTintColor: "white",
			})}
		>
			<CharactersScreensStack.Screen name="Characters" component={CharactersScreen} />
			<CharactersScreensStack.Screen
				name="CharacterQuotes"
				component={CharacterQuotesScreen}
				options={({ route }) => ({ title: route.params.character + " Quotes" })}
			/>
		</CharactersScreensStack.Navigator>
	);
}
