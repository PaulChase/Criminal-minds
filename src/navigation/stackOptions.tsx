import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { IconButton } from "@/components/ui/IconButton";
import { colors } from "@/theme/colors";
import { fonts } from "@/theme/fonts";

export const stackScreenOptions: NativeStackNavigationOptions = {
	headerStyle: { backgroundColor: colors.bg },
	headerShadowVisible: false,
	headerTintColor: colors.text,
	headerTitleStyle: { fontFamily: fonts.semibold, fontSize: 18 },
	headerBackButtonDisplayMode: "minimal",
	contentStyle: { backgroundColor: colors.bg },
	headerRight: () => <SearchHeaderButton />,
};

function SearchHeaderButton() {
	const navigation = useNavigation();
	return <IconButton icon="search" accessibilityLabel="Search quotes" onPress={() => navigation.navigate("Search")} />;
}
