/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
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
	plugins: [],
};
