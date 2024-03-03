"use client";

import React from "react";

import { LineChart } from "@tremor/react";

export function ChartComponent({
	data,
	index,
	colors,
	categories,
	valueFormatter,
}) {
	return (
		<LineChart
			className="mt-6"
			data={data}
			index={index}
			categories={categories}
			colors={colors}
			valueFormatter={valueFormatter}
		/>
	);
}
