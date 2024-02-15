const fonts = {
	text_regular: "text-regular",
	text_medium: "text-medium",
	text_semibold: "text-semibold",
	heading_bold: "heading-bold",
	heading_black: "heading-black",
};

const colors = {
	primary: "#d97706",
	darkBg: "#121212",
	darkComponentBg: "#1e1e1e",
};

const BACKEND_API_URL = "https://criminal-minds-quotes.netlify.app/api";

const characters = ["Gideon", "Morgan", "Hotch", "Reid", "Elle", "JJ", "Prentiss", "Rossi", "Garcia"];

const characterImages = {
	Gideon: {
		uri: require("../../assets/characters/Gideon.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Gideon.jpeg"),
	},
	Morgan: {
		uri: require("../../assets/characters/Morgan.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Morgan.jpeg"),
	},
	Hotch: {
		uri: require("../../assets/characters/Hotch.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Hotch.jpeg"),
	},
	Reid: {
		uri: require("../../assets/characters/Reid.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Reid.jpeg"),
	},
	Elle: {
		uri: require("../../assets/characters/Elle.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Elle.jpeg"),
	},
	JJ: {
		uri: require("../../assets/characters/JJ.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/JJ.jpeg"),
	},
	Prentiss: {
		uri: require("../../assets/characters/Prentiss.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Prentiss.jpeg"),
	},
	Rossi: {
		uri: require("../../assets/characters/Rossi.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Rossi.jpeg"),
	},
	Garcia: {
		uri: require("../../assets/characters/Garcia.jpeg"),
		profilePic: require("../../assets/characters/pofile_pics/Garcia.jpeg"),
	},
};

export default {
	fonts,
	colors,
	BACKEND_API_URL,
	characters,
	characterImages,
};
