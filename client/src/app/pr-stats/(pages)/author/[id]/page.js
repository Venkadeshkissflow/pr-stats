import React from "react";

import { getReviewTimeUrl, getReviewedPrListQuery } from "../../query";
import { Card } from "@tremor/react";
import { getFormattedDate } from "@/app/pr-stats/util";
import { ReviewedPrsList, TitleBar } from "@/app/pr-stats/(components)";

export default async function AuthorInfo({ params }) {
	const reviewedPrsList = await getReviewedPrListQuery(params.id);
	let reviewTimeUrlObj = await getReviewTimeUrl(params.id);

	return (
		<div className="p-4 flex flex-col gap-y-4">
			{Object.keys(reviewTimeUrlObj).map((urlTitle) => (
				<Card className="p-0 overflow-hidden">
					<iframe
						src={reviewTimeUrlObj[urlTitle]}
						frameBorder="0"
						width="100%"
						height="550px"
						overflow="hidden"
						borderRadius="8px"
						margin="8px"
						allowFullScreen
					></iframe>
				</Card>
			))}

			<ReviewedPrsList reviewers={reviewedPrsList} />
		</div>
	);
}
