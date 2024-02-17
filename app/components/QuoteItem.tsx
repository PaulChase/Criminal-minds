import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import MyText from "./MyText";
import { QuoteType } from "../utils/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../utils/constants";

interface QuoteItemProps {
	quote: QuoteType;
	index: number;
}

export default function QuoteItem({ quote, index }: QuoteItemProps) {
	const { height } = Dimensions.get("window");

	let imgSource = null;

	switch (quote.saidBy) {
		case "Gideon":
			imgSource = constants.characterImages.Gideon.uri;
			break;

		case "Hotch":
			imgSource = constants.characterImages.Hotch.uri;
			break;

		case "Morgan":
			imgSource = constants.characterImages.Morgan.uri;
			break;

		case "Reid":
			imgSource = constants.characterImages.Reid.uri;
			break;

		case "Elle":
			imgSource = constants.characterImages.Elle.uri;
			break;

		case "JJ":
			imgSource = constants.characterImages.JJ.uri;
			break;

		case "Prentiss":
			imgSource = constants.characterImages.Prentiss.uri;
			break;

		case "Rossi":
			imgSource = constants.characterImages.Rossi.uri;
			break;

		case "Garcia":
			imgSource = constants.characterImages.Garcia.uri;
			break;
	}

	return (
		<ImageBackground
			source={imgSource}
			style={{
				flex: 1,
				width: "100%",
				height: height - 60,
				justifyContent: "center",
			}}
			resizeMode="cover"
		>
			<View style={styles.overlay} className=" justify-center p-4 ">
				<Text className=" text-white text-2xl font-bold italic">" {quote.text} "</Text>
				<Text className=" text-white text-lg font-semibold  mt-2"> - {quote.author}</Text>

				<View className=" flex flex-row items-center gap-2 mt-1">
					<MaterialCommunityIcons name="movie-play" size={24} color="white" />
					<Text className=" text-white  font-semibold ">
						{" "}
						{quote.season} - {quote.episode}{" "}
					</Text>
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageBackground: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)", // Change the opacity and color as needed
	},
});
