import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastHost } from "@/components/toast/ToastHost";
import { useFavorites } from "@/features/favorites/favoritesStore";
import { RootNavigator } from "@/navigation/RootNavigator";
import { colors } from "@/theme/colors";
import { fontAssets } from "@/theme/fonts";
import { navigationTheme } from "@/theme/navigationTheme";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 250, fade: true });

function useFavoritesHydrated() {
	const [hydrated, setHydrated] = useState(() => useFavorites.persist.hasHydrated());
	useEffect(() => {
		const unsubscribe = useFavorites.persist.onFinishHydration(() => setHydrated(true));
		setHydrated(useFavorites.persist.hasHydrated());
		return unsubscribe;
	}, []);
	return hydrated;
}

export default function App() {
	const [fontsLoaded, fontError] = useFonts(fontAssets);
	const favoritesHydrated = useFavoritesHydrated();
	const ready = (fontsLoaded || fontError !== null) && favoritesHydrated;

	useEffect(() => {
		if (ready) SplashScreen.hideAsync();
	}, [ready]);

	if (!ready) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
			<SafeAreaProvider>
				<NavigationContainer theme={navigationTheme}>
					<RootNavigator />
				</NavigationContainer>
				<ToastHost />
				<StatusBar style="light" />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
