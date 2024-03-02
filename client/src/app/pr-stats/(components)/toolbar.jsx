"use client";

import React from "react";

import { SearchInput } from "./searchInput";
import { FilterInput } from "./filterInput";

export function Toolbar({ onSearch, onFilter }) {
	return (
		<div className="flex items-center h-full justify-between">
			<SearchInput onSearch={onSearch} />
			<FilterInput onFilter={onFilter} />
		</div>
	);
}
