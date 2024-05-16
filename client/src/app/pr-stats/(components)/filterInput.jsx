"use client";

import React from "react";

import { Select, SelectItem } from "@tremor/react";

import { TIME_PERIOD } from "@/app/constant";

export function FilterInput({ onFilter } = props) {
	return (
		<div className="flex w-52 min-h-8 ">
			<Select onValueChange={onFilter} defaultValue={TIME_PERIOD.DEFAULT}>
				<SelectItem value={TIME_PERIOD.LAST_3_MONTHS}>Last 30 days</SelectItem>
				<SelectItem value={TIME_PERIOD.LAST_6_MONTHS}>Last 60 days</SelectItem>
				<SelectItem value={TIME_PERIOD.THIS_YEAR}>This year</SelectItem>
				<SelectItem value={TIME_PERIOD.LAST_YEAR}>Last year</SelectItem>
			</Select>
		</div>
	);
}
