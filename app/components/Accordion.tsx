import React, { ReactElement, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MyText from "./MyText";

interface AccordionProps {
	title: ReactElement;
	content: ReactElement;
}

const Accordion = ({ title, content }: AccordionProps) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [animation] = useState(new Animated.Value(0));

	const toggleAccordion = () => {
		setIsExpanded(!isExpanded);
		Animated.timing(animation, {
			toValue: isExpanded ? 0 : 1,
			duration: 300,
			useNativeDriver: false,
		}).start();
	};

	const heightInterpolate = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 80], // Adjust as per your content height
	});

	const animatedStyles = {
		height: heightInterpolate,
	};

	return (
		<View className="">
			<TouchableOpacity activeOpacity={0.8} onPress={toggleAccordion}>
				{title}
			</TouchableOpacity>

			{!isExpanded && (
				<View className=" flex flex-row items-center">
					<FontAwesome5 name="ellipsis-h" size={24} color="white" />
					<MyText className=" ml-2 text-xs">View more</MyText>
				</View>
			)}

			<Animated.View style={[animatedStyles]}>{content}</Animated.View>
		</View>
	);
};

export default Accordion;
