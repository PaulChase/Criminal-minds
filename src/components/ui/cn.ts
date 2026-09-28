import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-family": [
				{ font: ["text-regular", "text-medium", "text-semibold", "text-bold", "text-black", "heading-bold", "heading-black"] },
			],
		},
	},
});

/** Joins class names, letting later classes override earlier ones (e.g. a caller's font over the default). */
export const cn = (...classes: (string | false | null | undefined)[]) => twMerge(classes.filter(Boolean).join(" "));
