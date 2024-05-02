"use client";

import React, { useState } from "react";

import { Button } from "@tremor/react";

import { Card } from "@tremor/react";
import { Icon } from "@tremor/react";
import { useRouter } from "next/navigation";
import {
	RiGitPullRequestFill,
	RiArrowDownSFill,
	RiArrowUpSFill,
} from "@remixicon/react";

import { getPrReviewersListApi } from "../route";

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
						id={pullRequestId}
						prTitle={pullRequestId}
						commentsCount={commentsCount}
						totalReviewTime={timeToReview}
					/>
				))}
			</div>
		</Card>
	);
}

function PrInfoCard({ id, prTitle, commentsCount, timeToReview = 0 }) {
	const [showReviewersList, setShowReviewersList] = useState(false);
	const [reviewers, setRewievers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function showAndHideReviewers(id) {
		setShowReviewersList((prevState) => !prevState);
		await getPrReviewersListApi(id)
			.then((res) => setRewievers(res))
			.catch((errRes) => console.log(errRes, "Error response"))
			.finally(() => setIsLoading(false));
	}

	return (
		<div>
			<Card
				onClick={() => showAndHideReviewers(id)}
				className="flex p-4 items-center gap-4 z-10"
			>
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
				<Button
					className="h-fit flex items-center"
					variant="light"
					icon={showReviewersList ? RiArrowUpSFill : RiArrowDownSFill}
					iconPosition={"right"}
				>
					View reviewers
				</Button>
			</Card>
			<Card
				className={`p-0 bg-slate-100 ${styles.reviewersList} ${
					showReviewersList
						? styles.showReviewersList
						: styles.hideReviewersList
				}`}
			>
				{isLoading ? (
					<div className="h-full flex items-center justify-center">
						<Loader />
					</div>
				) : (
					<>
						{reviewers.map(({ id, name, avatarUrl }) => (
							<ReviewerCard
								key={id}
								id={id}
								name={name}
								avatarUrl={avatarUrl}
							/>
						))}
					</>
				)}
			</Card>
		</div>
	);
}

function ReviewerCard({ avatarUrl, name, id }) {
	const router = useRouter();

	function updateAuthorPage(id) {
		router.push(`/pr-stats/author/${id}`);
	}

	return (
		<Card
			onClick={() => updateAuthorPage(id)}
			className="p-1 flex gap-2 items-center w-36 h-fit cursor-pointer"
		>
			<span>
				<img className="h-5 w-5 rounded" src={avatarUrl} alt="" />
			</span>
			<span className="text-xs">{name}</span>
		</Card>
	);
}
