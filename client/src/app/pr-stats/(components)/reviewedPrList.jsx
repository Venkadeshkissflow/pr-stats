"use client";

import { Button } from "@tremor/react";

import { Card } from "@tremor/react";
import { Icon } from "@tremor/react";

import { RiGitPullRequestFill, RiArrowDownSFill } from "@remixicon/react";

export function ReviewedPrsList({ reviewers }) {
	return (
		<Card className="p-0">
			<div className="m-4 text-slate-800">Reviewed pull requests list</div>
			<span className="block h-px bg-slate-200" />
			<div className="m-4 flex flex-col gap-4">
				{reviewers.map(
					({ pullRequestId: prTitle, commentsCount, timeToReview }) => (
						<PrInfoCard
							prTitle={prTitle}
							prLink={prTitle}
							commentsCount={commentsCount}
							totalReviewTime={timeToReview}
						/>
					)
				)}
			</div>
		</Card>
	);
}

function PrInfoCard({ prTitle, prLink, commentsCount, timeToReview = 0 }) {
	return (
		<Card className="flex p-4 items-center gap-4">
			<Icon
				icon={RiGitPullRequestFill}
				variant="simple"
				size="md"
				borderRadius="Roundness"
			/>
			<div className="flex flex-col grow shrink basis-auto">
				<span className="text-slate-700 hover:text-blue-400	font-semibold text-base	cursor-default	cursor-pointer w-fit">
					{prTitle}
				</span>
				{/* <span>{prLink}</span> */}
				<div className="flex gap-4">
					<span className="text-slate-500	text-sm	cursor-default ">
						Comments count: {commentsCount}
					</span>
					<span className="text-slate-500	text-sm	cursor-default	">
						Total reviewed time: {timeToReview}
					</span>
				</div>
			</div>
			{/* <Card className="grow-0 p-0 shrink-0 basis-40 flex flex-col items-center ">
				<span className="w-full m-2 flex items-center justify-center border-b-2">
					Comments count
				</span>
				<span>{commentsCount}</span>
			</Card>
			<Card className="grow-0 p-0 shrink-0 basis-40 flex flex-col items-center ">
				<span className="w-full m-2 flex items-center justify-center border-b-2">
					Total reviewed time
				</span>
				<span>{timeToReview}</span>
			</Card> */}
			<Button
				className="h-fit flex items-center"
				variant="light"
				icon={RiArrowDownSFill}
				iconPosition={"right"}
			>
				View reviewers
			</Button>
		</Card>
	);
}
