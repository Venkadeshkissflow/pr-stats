"use client";

import React from "react";

import { Select, SelectItem } from "@tremor/react";

export function FilterInput({ onFilter } = props) {
	return (
		<div className="flex w-52 min-h-8">
			<Select onValueChange={onFilter} defaultValue="last-30-days">
				<SelectItem value="last-30-days">last 30 days</SelectItem>
				<SelectItem value="last-60-days">last 60 days</SelectItem>
				<SelectItem value="last-90-days">last 90 days</SelectItem>
			</Select>
		</div>
	);
}
