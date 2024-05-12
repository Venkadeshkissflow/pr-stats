import React from "react";

import { getReviewedPrListQuery } from "../../query";
import { Card } from "@tremor/react";
import { ChartComponent } from "@/app/pr-stats/(components)/chart";
import { getFormattedDate } from "@/app/pr-stats/util";
import { ReviewTimeChartWrapper } from "../reviewtimechartwrapper";
import { ReviewedPrsList, TitleBar } from "@/app/pr-stats/(components)";

export default async function AuthorInfo({ params }) {
	const reviewedPrsList = await getReviewedPrListQuery(params.id);

	const commentsCountFormattedData = reviewedPrsList.map(
		function formatteDataForClientSide(prInfo) {
			return {
				...prInfo,
				submittedAt: getFormattedDate(prInfo.submittedAt),
			};
		}
	);

	return (
		<div className="p-4 flex flex-col gap-y-4 overflow-scroll">
			<Card className="p-0">
				<TitleBar title={"Comments count"} />
				<ChartComponent
					data={commentsCountFormattedData}
					index={"submittedAt"}
					categories={["commentsCount"]}
					colors={["cyan"]}
				/>
			</Card>
			<ReviewTimeChartWrapper reviewers={reviewedPrsList} />
			<ReviewedPrsList reviewers={reviewedPrsList} />
		</div>
	);
}
