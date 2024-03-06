"use client";

import React from "react";

import { Card } from "@tremor/react";
import { convertMsToTime } from "../util";

export function InfoCard({
	totalContributors,
	commentsCount,
	reviewedPrsCount,
	totalReviewTime,
}) {
	return (
		<Card className=" flex justify-between rounded p-0">
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total contributors</p>
				<span className="font-medium">{totalContributors}</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total Comments</p>
				<span className="font-medium">{commentsCount}</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total Reviews</p>
				<span className="font-medium">{reviewedPrsCount}</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col">
				<p className="text-slate-800 font-bold">Total Review time</p>
				<span className="font-medium">{convertMsToTime(totalReviewTime)}</span>
			</div>
		</Card>
	);
}
