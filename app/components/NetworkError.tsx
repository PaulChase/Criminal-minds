import React, { useContext } from "react";
import MySafeAreaView from "./MySafeAreaView";
import MyText from "./MyText";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface NetworkErrorProps {
	handleRetry: () => void;
}

export default function NetworkError({ handleRetry }: NetworkErrorProps) {
	return (
		<MySafeAreaView className=" flex justify-center items-center p-6">
			<View>
				<MyText className=" text-xl font-heading-bold text-center">
					It seems you're not connected to the internet. {"\n"} Check your connection and try again.
				</MyText>
				<TouchableOpacity
					className=" bg-amber-700 py-4 px-8  rounded-md mt-4  mx-auto flex flex-row  items-center space-x-4"
					activeOpacity={0.6}
					onPress={handleRetry}
				>
					<FontAwesome name="refresh" size={24} color="white" />
					<Text className=" text-base font-text-regular text-white text-center">Retry</Text>
				</TouchableOpacity>
			</View>
		</MySafeAreaView>
	);
}
