import React from "react";

import { getReviewedPrListQuery } from "../../query";
import { Card } from "@tremor/react";
import { getFormattedDate } from "@/app/pr-stats/util";
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
		<div className="p-4 flex flex-col gap-y-4">
			<Card className="p-0 overflow-hidden">
				<TitleBar title={"Comments count"} />
				<iframe
					src="https://app.flowwer.dev/charts/review-time/~(u~(i~'82178572~n~'RashmiSubramani)~p~100~r~(~(d~'s99dce~t~'3q)))"
					frameBorder="0"
					width="100%"
					height="550px"
					overflow="hidden"
					borderRadius="8px"
					margin="8px"
					allowFullScreen
				></iframe>
			</Card>

			<ReviewedPrsList reviewers={reviewedPrsList} />
		</div>
	);
}
