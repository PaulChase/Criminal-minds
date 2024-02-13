import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Auth/Welcome";
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";

const AuthScreensStack = createStackNavigator();

export default function AuthStack() {
	return (
		<AuthScreensStack.Navigator initialRouteName="Welcome">
			<AuthScreensStack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
			<AuthScreensStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
			<AuthScreensStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
		</AuthScreensStack.Navigator>
	);
}
