import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QuoteViewerScreen } from "@/screens/QuoteViewerScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { colors } from "@/theme/colors";
import { TabsNavigator } from "./TabsNavigator";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
			<Stack.Screen name="Tabs" component={TabsNavigator} />
			<Stack.Screen name="Search" component={SearchScreen} options={{ animation: "slide_from_right" }} />
			{/* A push rather than a native modal, so toasts (rendered above navigation) stay visible on iOS. */}
			<Stack.Screen name="QuoteViewer" component={QuoteViewerScreen} options={{ animation: "slide_from_bottom" }} />
		</Stack.Navigator>
	);
}
