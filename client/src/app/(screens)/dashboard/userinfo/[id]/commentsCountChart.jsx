"use client";

import { LineChart } from "@tremor/react";

function getFormattedDate(originalData) {
	const date = new Date(originalData);

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	return `${day}/${month}/${year}`;
}

export function CommentsCountChart({ reviewers }) {
	const formattedData = reviewers.map(function formatteDataForClientSide(
		prInfo
	) {
		return {
			...prInfo,
			submittedAt: getFormattedDate(prInfo.submittedAt),
		};
	});

	return (
		<LineChart
			className="mt-6"
			data={formattedData}
			index="submittedAt"
			categories={["commentsCount"]}
			colors={["cyan"]}
			// valueFormatter={axisFormatter}
		/>
	);
}
