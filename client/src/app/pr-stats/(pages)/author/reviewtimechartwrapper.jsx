"use client";

import React from "react";

import { getFormattedDate } from "../../util";
import { convertMsToTime } from "../../util";
import { Card } from "@tremor/react";
import { ChartComponent } from "../../(components)/chart";

const timeFormatted = (timeInMS) => `${convertMsToTime(timeInMS)}`;

export function ReviewTimeChartWrapper({ reviewers }) {
	const reviewTimeFormattedData = reviewers.map(
		function formatteDataForClientSide(prInfo) {
			return {
				...prInfo,
				submittedAt: getFormattedDate(prInfo.submittedAt),
			};
		}
	);

	return (
		<Card className="rounded">
			<div className="border-b-2">Review time</div>
			<ChartComponent
				data={reviewTimeFormattedData}
				index={"submittedAt"}
				categories={["reviewTime"]}
				colors={["lime"]}
				valueFormatter={(num) => timeFormatted(num)}
			/>
		</Card>
	);
}
