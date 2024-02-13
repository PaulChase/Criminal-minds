import React from "react";
import { Dimensions, ImageBackground, StyleSheet, Text, View } from "react-native";
import MyText from "./MyText";
import { QuoteType } from "../utils/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface QuoteItemProps {
	quote: QuoteType;
	index: number;
}

export default function QuoteItem({ quote, index }: QuoteItemProps) {
	const { height } = Dimensions.get("window");

	const name = "hotchner";

	return (
		<ImageBackground
			source={require(`../../assets/characters/${name}.jpeg`)} // Replace 'your_image.jpg' with the path to your image
			style={{
				flex: 1,
				width: "100%",
				height: height - 60,
				justifyContent: "center",
			}}
			resizeMode="cover"
		>
			<View style={styles.overlay} className=" justify-center p-4">
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
