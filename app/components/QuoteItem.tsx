import React, { useRef } from "react";
import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import MyText from "./MyText";
import { QuoteType } from "../utils/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { captureRef, captureScreen } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

interface QuoteItemProps {
	quote: QuoteType;
	index: number;
}

export default function QuoteItem({ quote, index }: QuoteItemProps) {
	const { height } = Dimensions.get("window");
	const viewRef = useRef();

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

	const captureAndSave = async () => {
		// check for permissions
		const { status } = await MediaLibrary.requestPermissionsAsync();

		if (status !== "granted") {
			alert("You need to enable permissions to save images to your device.");
			return;
		}

		try {
			// Capture the view
			const uri = await captureRef(viewRef, { format: "png", quality: 1 });
			// const uri = await captureRef(viewRef, { format: "png", quality: 1 });

			// Get the file name (e.g., 'image.png')
			const fileName = quote.saidBy + "_" + quote.season + "_" + quote.episode + ".png";

			// Save the captured image to the device's file system
			const fileUri = FileSystem.cacheDirectory + fileName; // Using cacheDirectory
			await FileSystem.copyAsync({ from: uri, to: fileUri });

			// Save the image to the device's media library with the custom name
			await MediaLibrary.saveToLibraryAsync(fileUri);
			alert("Image saved successfully!");
		} catch (error) {
			alert("Failed to save image: " + error);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				width: "100%",
				height: height - 60,
				justifyContent: "center",
				position: "relative",
			}}
			ref={viewRef}
			collapsable={false}
		>
			<Image
				source={imgSource}
				resizeMode="cover"
				style={[styles.imageBackground, { width: "100%", height: "100%" }]}
				onLoad={() => console.log("image loaded")}
			/>

			<View style={styles.overlay} className=" flex-1 justify-center">
				<View className=" justify-center p-4 ">
					<FontAwesome5 name="quote-left" size={24} color="white" />

					<Text className=" text-white text-3xl font-text-bold leading-10"> {quote.text}</Text>
					<FontAwesome5 name="quote-right" size={24} color="white" />

					<Text className=" text-white text-lg font-semibold  mt-3 font-text-semibold"> - {quote.author}</Text>

					<View className=" flex flex-row items-center gap-2 mt-2 ">
						<MaterialCommunityIcons name="movie-play" size={24} color="white" />
						<Text className=" text-white font-heading-black text-base ">
							{quote.season} - {quote.episode}{" "}
						</Text>
					</View>
				</View>

				<Pressable
					collapsable={true}
					className=" absolute bottom-12 right-8 h-14 w-14 rounded-full flex items-center justify-center"
					style={{ backgroundColor: constants.colors.primary }}
					onPress={captureAndSave}
				>
					<FontAwesome5 name="download" size={24} color="white" />
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageBackground: {
		// ...StyleSheet.absoluteFillObject,
		flex: 1,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.5)", // Change the opacity and color as needed
	},
});
