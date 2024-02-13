import React from "react";
import { TextInput } from "react-native";

export default function InputText({ value, setValue, placeholder, ...props }) {
	return (
		<TextInput
			value={value}
			className="pr-2 pl-4 py-3 bg-gray-50 rounded-full border border-gray-200 w-full"
			placeholder={placeholder}
			onChangeText={setValue}
			{...props}
		/>
	);
}
