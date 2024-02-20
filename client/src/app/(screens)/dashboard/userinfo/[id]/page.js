import { Card, Title, LineChart } from "@tremor/react";
import { getAuthorInfo } from "../../service";

import { ReviewTimeChart } from "./reviewTimeChart";
import { CommentsCountChart } from "./commentsCountChart";
import { convertMsToTime } from "../../util";
import { InfoCard } from "@/app/components/InfoCard";

async function getUserData(id) {
	console.log(id, "params api test");
	const res = await fetch(
		`https://pr-stats.venkadeshrenugadevi.workers.dev/pr-stats/api/author/${id}`
	);

	if (!res.ok) {
		throw new Error("Failed to fetch reviewerInfo");
	}

	return res.json();
}

export default async function User({ params }) {
	const reviewerInfo = await getAuthorInfo(params.id);

	function getFormattedDate(originalData) {
		const date = new Date(originalData);

		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");

		return `${day}/${month}/${year}`;
	}

	const sumOfCommentsCount = reviewerInfo.reviews.reduce(
		(accumulator, { commentsCount }) => {
			return accumulator + commentsCount;
		},
		0
	);

	const sumOfReviewTime = reviewerInfo.reviews.reduce(
		(accumulator, { reviewTime }) => {
			return accumulator + reviewTime;
		},
		0
	);

	const formattedData = reviewerInfo.reviews.map(
		function formatteDataForClientSide(prInfo) {
			return {
				...prInfo,
				submittedAt: getFormattedDate(prInfo.submittedAt),
			};
		}
	);

	return (
		<div className="h-auto overflow-y-auto grid auto-rows-max p-4 gap-4 w-full">
			<div className="flex gap-4">
				<InfoCard title={"Comments count"} value={sumOfCommentsCount} />
				<InfoCard
					title={"Review time"}
					value={convertMsToTime(sumOfReviewTime)}
				/>
				<InfoCard
					title={"Total reviewed prs"}
					value={reviewerInfo.totalReviewedPr}
				/>
			</div>
			<div className="flex gap-4">
				<div className="flex-1">
					<Card>
						<Title>Comments chart</Title>
						<CommentsCountChart reviewers={reviewerInfo.reviews} />
					</Card>
				</div>
				<div className="flex-1">
					<Card>
						<Title>Reviewe time chart</Title>
						<ReviewTimeChart reviewers={reviewerInfo.reviews} />
					</Card>
				</div>
			</div>
			<Card>
				<Title>Pending pr's</Title>
				{reviewerInfo.reviews.map(({ pullRequestId }) => (
					<li key={pullRequestId}>pr id: {pullRequestId}</li>
				))}
			</Card>
		</div>
	);
}
