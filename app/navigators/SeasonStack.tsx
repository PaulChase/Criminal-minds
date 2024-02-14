import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import constants from "../utils/constants";
import { useColorScheme } from "nativewind";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import SeasonsScreen from "../screens/SeasonsScreen";
import EpisodesScreen from "../screens/EpisodesScreen";

const SeasonsScreensStack = createStackNavigator();

export default function SeasonsStack() {
	const { colorScheme } = useColorScheme();

	return (
		<SeasonsScreensStack.Navigator
			initialRouteName="Home"
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
			<SeasonsScreensStack.Screen name="Season" component={SeasonsScreen} />
			<SeasonsScreensStack.Screen name="Episodes" component={EpisodesScreen} />
		</SeasonsScreensStack.Navigator>
	);
}
