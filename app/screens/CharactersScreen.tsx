import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, View } from "react-native";
import MySafeAreaView from "../components/MySafeAreaView";
import MyText from "../components/MyText";
import MyView from "../components/MyView";
import constants from "../utils/constants";
import axiosInstance from "../utils/axiosConfig";
import { displayError } from "../utils/helpers";
import { SeasonType } from "../utils/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import CharacterListItem from "../components/CharacterListItem";

function CharactersScreen({ navigation, route }) {
	const [characters, setCharacters] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchCharacters = async () => {
		try {
			const response = await axiosInstance.get("/characters");
			setCharacters(response.data.characters);
		} catch (error) {
			displayError(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCharacters();
	}, []);

	if (isLoading) {
		return (
			<MyView className="flex-1 justify-center items-center ">
				<ActivityIndicator size={60} color={constants.colors.primary} />
			</MyView>
		);
	}

	const renderItem = ({ item, index }) => {
		return <CharacterListItem character={item} />;
	};

	return (
		<MySafeAreaView className="">
			<View className=" flex-1  px-4 py-8">
				<FlatList
					data={characters}
					renderItem={renderItem}
					numColumns={2}
					contentContainerStyle={{ gap: 30 }}
					columnWrapperStyle={{ columnGap: 30 }}
					ListFooterComponent={<View className="h-16"></View>}
				/>
			</View>
		</MySafeAreaView>
	);
}

export default CharactersScreen;
