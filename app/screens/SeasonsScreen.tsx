import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import MySafeAreaView from "../components/MySafeAreaView";
import MyText from "../components/MyText";
import MyView from "../components/MyView";
import constants from "../utils/constants";
import axiosInstance from "../utils/axiosConfig";
import { displayError } from "../utils/helpers";
import { SeasonType } from "../utils/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function SeasonsScreen({ navigation, route }) {
	const [Seasons, setSeasons] = useState<SeasonType[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchQuotes = async () => {
		try {
			const response = await axiosInstance.get("/seasons");
			setSeasons(response.data.allSeasons);
		} catch (error) {
			displayError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	const goToEpisodeScreen = (season: string) => {
		navigation.navigate("Episodes", {
			season,
		});
	};

	if (loading) {
		return (
			<MyView className="flex-1 justify-center items-center ">
				<ActivityIndicator size={60} color={constants.colors.primary} />
			</MyView>
		);
	}
	return (
		<MySafeAreaView>
			<ScrollView className=" px-4 py-8 space-y-4">
				{Seasons.map((season, index) => (
					<TouchableOpacity key={index} onPress={() => goToEpisodeScreen(season.season)}>
						<MyView className="p-4 rounded-lg flex flex-row items-center justify-between">
							<View>
								<MyText className="text-lg  font-semibold">{season.season}</MyText>
								<MyText className="text-gray-400 mt-2">{season.quotes} episodes</MyText>
							</View>
							<FontAwesome5 name="chevron-right" size={24} color="white" />
						</MyView>
					</TouchableOpacity>
				))}
			</ScrollView>
		</MySafeAreaView>
	);
}

export default SeasonsScreen;
