// SwipeUpComponent.js
import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { PanGestureHandler, State, GestureHandlerRootView } from "react-native-gesture-handler";

const SwipeUpComponent = () => {
	const translateY = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);

	const data = ["Swipe Up/Down", "Next String", "Keep Swiping", "More Content", "Last String"];

	const onGestureEvent = Animated.event([{ nativeEvent: { translationY: translateY } }], { useNativeDriver: false });

	const onHandlerStateChange = (event) => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			const { translationY } = event.nativeEvent;
			const newIndex = translationY > 0 ? currentIndex + 1 : currentIndex - 1;
			const nextIndex = Math.max(0, Math.min(newIndex, data.length - 1));

			setCurrentIndex(nextIndex);

			Animated.spring(translateY, {
				toValue: translationY > 0 ? 300 : 0,
				useNativeDriver: false,
			}).start();
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
				<Animated.View style={[styles.box, { transform: [{ translateY }] }]}>
					<Text style={styles.text}>{data[currentIndex]}</Text>
				</Animated.View>
			</PanGestureHandler>
		</GestureHandlerRootView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	box: {
		width: 200,
		height: 200,
		backgroundColor: "skyblue",
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		color: "white",
		fontSize: 18,
	},
});

export default SwipeUpComponent;
