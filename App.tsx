import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import AuthStack from "./app/navigators/AuthStack";
import "react-native-gesture-handler";
import MainNavigation from "./app/navigators/MainNavigation";
import UserContextComponent from "./app/contexts/UserContext";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "nativewind";
import NetInfo from "@react-native-community/netinfo";
import NetworkError from "./app/components/NetworkError";
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
import constants from "./app/utils/constants";
import Home from "./app/screens/Home";
import SeasonsScreen from "./app/screens/SeasonsScreen";
import SeasonsStack from "./app/navigators/SeasonStack";
import CharactersStack from "./app/navigators/CharactersStack";

const Tab = createBottomTabNavigator();

export default function App() {
	const [fontsLoaded] = useFonts({
		"text-regular": require("./assets/fonts/Poppins-Regular.ttf"),
		"text-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
		"text-medium": require("./assets/fonts/Poppins-Medium.ttf"),
		"heading-bold": require("./assets/fonts/Lato-Bold.ttf"),
		"heading-black": require("./assets/fonts/Lato-Black.ttf"),
	});
	const [isInternetAvailable, setIsInternetAvailable] = useState<boolean | null>(null);

	const checkInternetConnection = () => {
		NetInfo.fetch().then((state) => {
			setIsInternetAvailable(state.isConnected);
		});
	};

	useEffect(() => {
		checkInternetConnection();
	}, []);

	if (isInternetAvailable === null) return null;

	if (!isInternetAvailable) return <NetworkError handleRetry={checkInternetConnection} />;

	if (!fontsLoaded) {
		return (
			<SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<ActivityIndicator size={60} />
			</SafeAreaView>
		);
	}

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						switch (route.name) {
							case "Home":
								return <Ionicons name="home" size={20} color={color} />;
							case "SeasonsStack":
								return <MaterialIcons name="live-tv" size={20} color={color} />;

							case "CharactersStack":
								return <FontAwesome name="users" size={20} color={color} />;
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
						backgroundColor: constants.colors.darkComponentBg,
					},
					headerShown: true,
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
				<Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
				<Tab.Screen name="SeasonsStack" component={SeasonsStack} options={{ headerShown: false, title: "Seasons" }} />
				<Tab.Screen
					name="CharactersStack"
					component={CharactersStack}
					options={{ headerShown: false, title: "Characters" }}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
