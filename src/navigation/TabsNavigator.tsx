import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ComponentProps } from "react";
import { CharacterScreen } from "@/screens/CharacterScreen";
import { CharactersScreen } from "@/screens/CharactersScreen";
import { FavoritesScreen } from "@/screens/FavoritesScreen";
import { FeedScreen } from "@/screens/FeedScreen";
import { SeasonScreen } from "@/screens/SeasonScreen";
import { SeasonsScreen } from "@/screens/SeasonsScreen";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";
import { stackScreenOptions } from "./stackOptions";
import type { CharactersStackParamList, FavoritesStackParamList, SeasonsStackParamList, TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();
const SeasonsStack = createNativeStackNavigator<SeasonsStackParamList>();
const CharactersStack = createNativeStackNavigator<CharactersStackParamList>();
const FavoritesStack = createNativeStackNavigator<FavoritesStackParamList>();

function SeasonsNavigator() {
	return (
		<SeasonsStack.Navigator screenOptions={stackScreenOptions}>
			<SeasonsStack.Screen name="Seasons" component={SeasonsScreen} />
			<SeasonsStack.Screen name="Season" component={SeasonScreen} options={({ route }) => ({ title: `Season ${route.params.season}` })} />
		</SeasonsStack.Navigator>
	);
}

function CharactersNavigator() {
	return (
		<CharactersStack.Navigator screenOptions={stackScreenOptions}>
			<CharactersStack.Screen name="Characters" component={CharactersScreen} />
			<CharactersStack.Screen name="Character" component={CharacterScreen} options={({ route }) => ({ title: route.params.characterId })} />
		</CharactersStack.Navigator>
	);
}

function FavoritesNavigator() {
	return (
		<FavoritesStack.Navigator screenOptions={stackScreenOptions}>
			<FavoritesStack.Screen name="FavoritesList" component={FavoritesScreen} options={{ title: "Favorites" }} />
		</FavoritesStack.Navigator>
	);
}

type IconName = ComponentProps<typeof Ionicons>["name"];
const TAB_ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
	Feed: ["flame", "flame-outline"],
	SeasonsTab: ["tv", "tv-outline"],
	CharactersTab: ["people", "people-outline"],
	FavoritesTab: ["heart", "heart-outline"],
};

export function TabsNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				freezeOnBlur: true,
				tabBarActiveTintColor: colors.primaryLight,
				tabBarInactiveTintColor: colors.muted,
				tabBarStyle: { backgroundColor: colors.bg, borderTopColor: colors.border },
				tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
				tabBarIcon: ({ focused, color, size }) => <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={size - 2} color={color} />,
			})}
		>
			<Tab.Screen name="Feed" component={FeedScreen} options={{ title: "Feed" }} />
			<Tab.Screen name="SeasonsTab" component={SeasonsNavigator} options={{ title: "Seasons" }} />
			<Tab.Screen name="CharactersTab" component={CharactersNavigator} options={{ title: "Characters" }} />
			<Tab.Screen name="FavoritesTab" component={FavoritesNavigator} options={{ title: "Favorites" }} />
		</Tab.Navigator>
	);
}
