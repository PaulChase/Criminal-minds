import React, { useContext } from "react";
import MySafeAreaView from "./MySafeAreaView";
import MyView from "./MyView";
import MyText from "./MyText";
import { Text, TouchableOpacity, View } from "react-native";
import { handleSubscribePremium } from "../utils/helpers";
import { UserContext } from "../contexts/UserContext";

export default function PlanExpiredComponent() {
	const { user } = useContext(UserContext);
	return (
		<MySafeAreaView className=" flex justify-center items-center">
			<View>
				<MyText className=" text-2xl font-heading-bold">Sorry, your free plan has expired</MyText>
				<TouchableOpacity
					className=" bg-amber-700 p-4  rounded-md mt-4"
					activeOpacity={0.6}
					onPress={() => handleSubscribePremium(user.hash_id)}
				>
					<Text className=" text-base font-text-regular text-white text-center">Upgrade to premium to continue</Text>
				</TouchableOpacity>
			</View>
		</MySafeAreaView>
	);
}
