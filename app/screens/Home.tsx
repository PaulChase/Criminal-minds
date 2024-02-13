import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import constants from "../utils/constants";
import MySafeAreaView from "../components/MySafeAreaView";
import MyView from "../components/MyView";
import MyText from "../components/MyText";
import axiosInstance from "../utils/axiosConfig";
import StoryListItem, { StoryProps } from "../components/StoryListItem";
import { displayError } from "../utils/helpers";
import { Dimensions } from "react-native";
import { QuoteType } from "../utils/types";
import QuoteItem from "../components/QuoteItem";

const data = ["Swipe Up/Down", "Next String", "Keep Swiping", "More Content", "Last String"];

const colorsArray = [
	"#FF5733", // Orange
	"#32CD32", // Lime Green
	"#FF00FF", // Magenta
	"#4169E1", // Royal Blue
	"#FF6347", // Tomato
	"#9370DB", // Medium Purple
	"#00FFFF", // Cyan
	"#800000", // Maroon
	"#008080", // Teal
	"#9400D3", // Dark Violet
	"#FF8C00", // Dark Orange
	"#00FF00", // Green
	"#6A5ACD", // Slate Blue
	"#FF4500", // Orange Red
	"#4682B4", // Steel Blue
	"#8B008B", // Dark Magenta
	"#FF1493", // Deep Pink
	"#1E90FF", // Dodger Blue
	"#9932CC", // Dark Orchid
	"#FA8072", // Salmon
];

const getRandomColor = () => {
	const randomIndex = Math.floor(Math.random() * colorsArray.length);
	return colorsArray[randomIndex];
};

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [quotes, setQuotes] = useState<QuoteType[]>([]);

	const { height } = Dimensions.get("window");

	const fetchQuotes = async () => {
		setIsFetchingMore(true);
		try {
			const response = await axiosInstance.get("/quotes");
			setQuotes((prev) => [...prev, ...response.data.quotes]);
		} catch (error) {
			displayError(error);
		} finally {
			setIsFetchingMore(false);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchQuotes();
	}, []);

	if (isLoading) {
		return (
			<MyView className="flex-1 justify-center items-center ">
				<ActivityIndicator size={60} color={constants.colors.primary} />
			</MyView>
		);
	}

	const renderFooter = () => (
		<View className=" mt-4">
			{isFetchingMore && (
				<MyView className="p-8 justify-center items-center  bg-black ">
					<ActivityIndicator size={60} color="red" />
				</MyView>
			)}
		</View>
	);

	return (
		<MySafeAreaView className="">
			<FlatList
				data={quotes}
				maxToRenderPerBatch={1}
				bounces={true}
				windowSize={1}
				pagingEnabled={true}
				// snapToAlignment={"end"}
				// snapToInterval={height - 60}
				decelerationRate={"fast"}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				renderItem={({ item, index }) => {
					return <QuoteItem index={index} quote={item} />;
				}}
				onEndReached={fetchQuotes}
				ListFooterComponent={renderFooter}
			/>
		</MySafeAreaView>
	);
}
