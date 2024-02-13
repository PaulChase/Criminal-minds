import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import constants from "../utils/constants";
import ShowStory from "../screens/ShowStory";
import { useColorScheme } from "nativewind";
import ShowChapter from "../screens/ShowChapter";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const StoriesScreensStack = createStackNavigator();

export default function StoriesStack() {
	const { colorScheme } = useColorScheme();

	// useLayoutEffect(() => {
	// 	// for hiding tab bar for chapter screen
	// 	const routeName = getFocusedRouteNameFromRoute(route);
	// 	if (routeName === "ShowChapter") {
	// 		navigation.setOptions({ tabBarStyle: { display: "none" } });
	// 	} else {
	// 		navigation.setOptions({
	// 			tabBarStyle: {
	// 				display: "flex",
	// 				backgroundColor: colorScheme === "dark" ? constants.colors.darkComponentBg : "white",
	// 			},
	// 		});
	// 	}
	// }, [navigation, route]);

	return (
		<StoriesScreensStack.Navigator
			initialRouteName="Home"
			screenOptions={() => ({
				headerStyle: {
					backgroundColor: colorScheme === "dark" ? constants.colors.darkComponentBg : "white",
				},
				headerTitleStyle: {
					fontFamily: constants.fonts.text_semibold,
					fontSize: 20,
				},
				headerTintColor: colorScheme === "dark" ? "white" : "#444",
			})}
		>
			<StoriesScreensStack.Screen name="All Stories" component={Home} options={{ headerTitle: "All Stories" }} />
			<StoriesScreensStack.Screen name="Show Story" component={ShowStory} options={{ headerTitle: "" }} />
			<StoriesScreensStack.Screen
				name="ShowChapter"
				component={ShowChapter}
				options={{
					title: "",
					headerTitleStyle: {
						fontFamily: constants.fonts.text_medium,
						fontSize: 20,
					},
				}}
			/>
		</StoriesScreensStack.Navigator>
	);
}
