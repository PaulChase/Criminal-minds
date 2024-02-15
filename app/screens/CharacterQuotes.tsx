import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import MySafeAreaView from "../components/MySafeAreaView";
import MyText from "../components/MyText";
import MyView from "../components/MyView";
import constants from "../utils/constants";
import axiosInstance from "../utils/axiosConfig";
import { displayError } from "../utils/helpers";
import { QuoteEpisodeType, SeasonType } from "../utils/types";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Accordion from "../components/Accordion";

function CharacterQuotesScreen({ route }) {
	const [quotes, setQuotes] = useState<QuoteEpisodeType[]>([]);
	const [loading, setLoading] = useState(true);

	const { character } = route.params;

	const fetchQuotes = async () => {
		try {
			const response = await axiosInstance.get("/characters/" + character);
			setQuotes(response.data.quotes);
		} catch (error) {
			displayError(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	if (loading) {
		return (
			<MyView className="flex-1 justify-center items-center ">
				<ActivityIndicator size={60} color={constants.colors.primary} />
			</MyView>
		);
	}
	return (
		<MySafeAreaView>
			<ScrollView className=" p-4 space-y-6">
				{quotes.map((quote, index) => (
					<MyView key={index} className="p-4 rounded-lg">
						<View>
							<Accordion
								title={<MyText className=" leading-6 text-base  font-semibold">{quote.text}</MyText>}
								content={
									<View>
										<MyText className="text-gray-300 mt-2">- {quote.author}</MyText>

										<MyText className="text-gray-300 mt-2 font-medium">
											<MaterialCommunityIcons name="movie-play" size={14} color="white" /> Episode: {quote.episode}
										</MyText>
									</View>
								}
							/>
						</View>
					</MyView>
				))}
			</ScrollView>
		</MySafeAreaView>
	);
}

export default CharacterQuotesScreen;
