"use client";

import React from "react";

import { TextInput } from "@tremor/react";

export function SearchInput(props) {
	const { onSearch } = props;
	return (
		<TextInput
			className="w-52 h-8"
			onValueChange={onSearch}
			placeholder="Search..."
		/>
	);
}
