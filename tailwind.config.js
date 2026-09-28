/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				bg: "#0d0d0d",
				surface: "#1a1a1a",
				"surface-2": "#242424",
				border: "#2a2a2a",
				primary: "#d97706",
				"primary-light": "#f59e0b",
				muted: "#9ca3af",
			},
			fontFamily: {
				"text-regular": ["text-regular"],
				"text-medium": ["text-medium"],
				"text-semibold": ["text-semibold"],
				"text-bold": ["text-bold"],
				"text-black": ["text-black"],
				"heading-bold": ["heading-bold"],
				"heading-black": ["heading-black"],
			},
		},
	},
	plugins: [],
};
