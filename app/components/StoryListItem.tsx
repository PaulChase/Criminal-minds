import React from "react";
import MyView from "./MyView";
import MyText from "./MyText";
import { FontAwesome } from "@expo/vector-icons";
import constants from "../utils/constants";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export interface StoryProps {
	id: number;
	title: string;
	created_at: string;
	cover_image: string;
	categories: string;
}

interface StoryListItemProps {
	story: StoryProps;
}

export default function StoryListItem({ story }: StoryListItemProps) {
	const navigation = useNavigation();

	const goToStoryScreen = () => {
		navigation.navigate("Show Story", {
			storyID: story.id,
		});
	};
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={goToStoryScreen}>
			<MyView className=" flex-row items-center my-2 px-4 py-6 rounded-md space-x-4">
				<FontAwesome name="book" size={30} color={constants.colors.primary} />
				<View>
					<MyText className=" text-base font-heading-bold ">{story.title}</MyText>
					{/* <Text className=" text-gray-500 ">{story.categories}</Text> */}
				</View>
			</MyView>
		</TouchableOpacity>
	);
}
