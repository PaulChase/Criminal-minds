import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import MyView from "./MyView";
import MyText from "./MyText";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import constants from "../utils/constants";

export default function CharacterListItem({ character }: { character: string }) {
	const navigation = useNavigation();

	const goToEpisodeScreen = (season: string) => {
		navigation.navigate("CharacterQuotes", {
			character,
		});
	};

	let imgSource = null;

	switch (character) {
		case "Gideon":
			imgSource = constants.characterImages.Gideon.profilePic;
			break;

		case "Hotch":
			imgSource = constants.characterImages.Hotch.profilePic;
			break;

		case "Morgan":
			imgSource = constants.characterImages.Morgan.profilePic;
			break;

		case "Reid":
			imgSource = constants.characterImages.Reid.profilePic;
			break;

		case "Elle":
			imgSource = constants.characterImages.Elle.profilePic;
			break;

		case "JJ":
			imgSource = constants.characterImages.JJ.profilePic;
			break;

		case "Prentiss":
			imgSource = constants.characterImages.Prentiss.profilePic;
			break;

		case "Rossi":
			imgSource = constants.characterImages.Rossi.profilePic;
			break;

		case "Garcia":
			imgSource = constants.characterImages.Garcia.profilePic;
			break;
	}

	return (
		<TouchableOpacity onPress={() => goToEpisodeScreen(character)} className="   flex-1">
			<MyView className="p-6 rounded-md flex gap-4 items-center justify-between">
				<Image
					source={imgSource}
					style={{
						width: 100,
						height: 100,
						borderRadius: 100,
					}}
				/>
				<View>
					<MyText className="text-lg  font-semibold">{character}</MyText>
				</View>
			</MyView>
		</TouchableOpacity>
	);
}
