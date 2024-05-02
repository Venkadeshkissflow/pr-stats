import React from "react";

import {
	getAuthorPrInfoApi,
	getReviewedPrsListApi,
} from "@/app/pr-stats/route";
import { Card } from "@tremor/react";
import { ChartComponent } from "@/app/pr-stats/(components)/chart";
import { getFormattedDate } from "@/app/pr-stats/util";
import { ReviewTimeChartWrapper } from "../reviewtimechartwrapper";
import { ReviewedPrsList, TitleBar } from "@/app/pr-stats/(components)";

export default async function AuthorInfo({ params }) {
	const reviewers = await getAuthorPrInfoApi(params.id);
	const reviewedPrsList = await getReviewedPrsListApi(params.id);

	// const { reviews: reviewers = [] } = authorInfo;

	// console.log(authorInfo, "authorInfo**********");

	const commentsCountFormattedData = reviewers.map(
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
			<ReviewTimeChartWrapper reviewers={reviewers} />
			reviewer info
			<ReviewedPrsList reviewers={reviewers} />
		</div>
	);
}
