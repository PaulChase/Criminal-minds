import axios from "axios";
import constants from "./constants";

const axiosInstance = axios.create({
	baseURL: constants.BACKEND_API_URL,
	timeout: 10000,
	// withCredentials: true,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default axiosInstance;
