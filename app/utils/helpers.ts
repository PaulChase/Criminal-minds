import * as WebBrowser from "expo-web-browser";
import constants from "./constants";
import * as Linking from "expo-linking";

export function displayError(error: any) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// You can access the error message from the response data
		alert(error.response.data.message);
	} else if (error.request) {
		// The request was made but no response was received
		alert(error.request);
	} else {
		// Something happened in setting up the request that triggered an error
		alert(error.message);
	}
}

export const handleSubscribePremium = async (hashId: string) => {
	let result = await WebBrowser.openBrowserAsync(constants.BACKEND_URL + "/mobile/" + hashId);
};

export function calculateDaysRemaining(date: string) {
	// Convert the target date to a JavaScript Date object
	const targetDateObject = new Date(date);

	// Get the current date
	const currentDate = new Date();

	// Calculate the difference in milliseconds
	const timeDifference = targetDateObject - currentDate;

	// Calculate the number of days remaining
	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return daysRemaining;
}

export const handleOpenURL = (link: string) => {
	Linking.openURL(link);
};
