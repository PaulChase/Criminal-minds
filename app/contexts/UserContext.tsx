import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../utils/axiosConfig";
import { calculateDaysRemaining } from "../utils/helpers";
import NetworkError from "../components/NetworkError";
import NetInfo from "@react-native-community/netinfo";

export const UserContext = React.createContext("");

export default function UserContextComponent({ children }) {
	const [user, setUser] = React.useState(null);
	const [token, setToken] = React.useState<string>("");
	const [isPlanValid, setIsPlanValid] = useState(true);
	const [isInternetAvailable, setIsInternetAvailable] = useState<boolean | null>(null);

	const checkInternetConnection = () => {
		NetInfo.fetch().then((state) => {
			setIsInternetAvailable(state.isConnected);
		});
	};

	useEffect(() => {
		checkInternetConnection();
	}, []);

	useEffect(() => {
		async function getuser() {
			let authToken = await SecureStore.getItemAsync("auth_token");
			if (authToken) {
				setToken(authToken);
				axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
				axiosInstance
					.get("/user")
					.then((res) => setUser(res.data))
					.catch((error) => alert(error.message));
			}
		}
		if (isInternetAvailable) {
			getuser();
		}
	}, [isInternetAvailable]);

	useEffect(() => {
		function checkPlan() {
			if (user?.plan === "premium") {
				return setIsPlanValid(true);
			}

			const daysLeft = calculateDaysRemaining(user?.free_plan_expiry);

			if (daysLeft < 0 && user?.plan === "free") {
				setIsPlanValid(false);
			} else {
				setIsPlanValid(true);
			}
		}

		if (user) {
			checkPlan();
		}
	}, [user]);

	if (isInternetAvailable === null) return null;

	if (!isInternetAvailable) return <NetworkError handleRetry={checkInternetConnection} />;

	return (
		<UserContext.Provider value={{ user, setUser, token, setToken, isPlanValid }}>{children}</UserContext.Provider>
	);
}
