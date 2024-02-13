import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import constants from "../utils/constants";
import ShowStory from "../screens/ShowStory";
import { useColorScheme } from "nativewind";
import ShowChapter from "../screens/ShowChapter";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import Categories from "../screens/Categories";
import CategoryStories from "../screens/CategoryStories";

const CategoriesScreensStack = createStackNavigator();

export default function CategoriesStack({ route, navigation }) {
	const { colorScheme } = useColorScheme();

	// useLayoutEffect(() => {
	// 	// for hiding tab bar for chapter screen
	// 	const routeName = getFocusedRouteNameFromRoute(route);
	// 	if (routeName === "Show Chapter") {
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
		<CategoriesScreensStack.Navigator
			screenOptions={() => ({
				headerStyle: {
					backgroundColor: colorScheme === "dark" ? constants.colors.darkComponentBg : "white",
				},
				headerTitleStyle: {
					fontFamily: constants.fonts.text_semibold,
					fontSize: 30,
				},
				headerTintColor: colorScheme === "dark" ? "white" : "#444",
			})}
		>
			<CategoriesScreensStack.Screen name="All Categories" component={Categories} />
			<CategoriesScreensStack.Screen
				name="Category Stories"
				component={CategoryStories}
				options={({ route }) => ({
					title: route?.params?.name + " stories" ?? "",
					headerTitleStyle: {
						fontFamily: constants.fonts.text_semibold,
						fontSize: 20,
					},
				})}
			/>
		</CategoriesScreensStack.Navigator>
	);
}
