import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	Feather,
	Ionicons,
	FontAwesome5,
	Entypo,
	MaterialIcons,
	MaterialCommunityIcons,
	AntDesign,
	FontAwesome,
} from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { useColorScheme } from "nativewind";
import constants from "../utils/constants";
import StoriesStack from "./StoriesStack";
import Categories from "../screens/Categories";
import CategoriesStack from "./CategoriesStack";
import Bookmarks from "../screens/Bookmarks";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
	const { colorScheme } = useColorScheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					switch (route.name) {
						case "Home":
							return <Ionicons name="home" size={20} color={color} />;
						case "Reading List":
							return <FontAwesome5 name="book-open" size={20} color={color} />;
						case "Categories":
							return <AntDesign name="tags" size={20} color={color} />;
						case "Profile":
							return <FontAwesome name="user-circle" size={20} color={color} />;
					}
				},
				tabBarActiveTintColor: "#c76c05",
				tabBarLabelStyle: {
					fontSize: 12,
				},
				tabBarStyle: {
					height: 60,
					borderTopWidth: 1,
					paddingTop: 8,
					paddingBottom: 8,
					borderTopColor: "gray",
					backgroundColor: colorScheme === "dark" ? constants.colors.darkComponentBg : "white",
				},
				headerShown: true,
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
			<Tab.Screen name="Home" component={StoriesStack} options={{ headerShown: false }} />
			<Tab.Screen name="Reading List" component={Bookmarks} options={{ title: "Reading List" }} />
			{/* <Tab.Screen name="Categories" component={CategoriesStack} options={{ headerShown: false }} /> */}
			<Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
}
