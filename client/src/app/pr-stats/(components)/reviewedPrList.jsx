"use client";
import React from "react";

import { Card } from "@tremor/react";
import { Icon } from "@tremor/react";
import { RiGitPullRequestFill } from "@remixicon/react";

import styles from "./styles.module.css";
import { Loader } from ".";

export function ReviewedPrsList({ reviewers }) {
	return (
		<Card className="p-0">
			<div className="m-4 text-slate-800">Reviewed pull requests list</div>
			<span className="block h-px bg-slate-200" />
			<div className="m-4 flex flex-col gap-4">
				{reviewers.map(({ pullRequestId, commentsCount, timeToReview }) => (
					<PrInfoCard
						key={pullRequestId}
						prTitle={pullRequestId}
						commentsCount={commentsCount}
						totalReviewTime={timeToReview}
					/>
				))}
			</div>
		</Card>
	);
}

function PrInfoCard({ prTitle, commentsCount, timeToReview = 0 }) {
	return (
		<Card className="flex p-4 items-center gap-4 z-10">
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
		</Card>
	);
}
