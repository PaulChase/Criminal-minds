// Font family names registered with useFonts (and used by the `font-*` Tailwind classes).
export const fonts = {
	regular: "text-regular",
	medium: "text-medium",
	semibold: "text-semibold",
	bold: "text-bold",
	black: "text-black",
	headingBold: "heading-bold",
	headingBlack: "heading-black",
} as const;

export const fontAssets = {
	[fonts.regular]: require("../../assets/fonts/Poppins-Regular.ttf"),
	[fonts.medium]: require("../../assets/fonts/Poppins-Medium.ttf"),
	[fonts.semibold]: require("../../assets/fonts/Poppins-SemiBold.ttf"),
	[fonts.bold]: require("../../assets/fonts/Poppins-Bold.ttf"),
	[fonts.black]: require("../../assets/fonts/Poppins-Black.ttf"),
	[fonts.headingBold]: require("../../assets/fonts/Lato-Bold.ttf"),
	[fonts.headingBlack]: require("../../assets/fonts/Lato-Black.ttf"),
};
