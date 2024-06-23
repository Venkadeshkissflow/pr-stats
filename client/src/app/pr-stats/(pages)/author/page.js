"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
	StatsInfoCard,
	TableComponent,
	Toolbar,
	InfoCard,
	Loader,
} from "../../(components)/index";
import { TIME_PERIOD } from "@/app/constant";
import { getContributorsList } from "../query";
import { convertMsToTime } from "../../util";
import { LineChart } from "@tremor/react";

function filterAuthorInfo(authorList = [], keyToFilter) {
	return authorList.reduce((acc, currentValue) => {
		return acc + currentValue[keyToFilter];
	}, 0);
}

export default function Page() {
	const router = useRouter();

	const authorListSourceRef = useRef([]);
	const [filterParam, setFilterParam] = useState(TIME_PERIOD.DEFAULT);
	const [authorList, setAuthorList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalAuthorInfo, setTotalAuthorInfo] = useState({
		totalContributors: 0,
		commentsCount: 0,
		reviewedPrsCount: 0,
		totalReviewTime: 0,
	});

	useEffect(function onLoad() {
		getContributorsList().then((contributors) => {
			setAuthorList(contributors);
			authorListSourceRef.current = contributors;
			let totalCommentsCount = filterAuthorInfo(contributors, "totalComments");
			let totalReviewedPrs = filterAuthorInfo(contributors, "totalReviews");
			let totalReviewTime = filterAuthorInfo(contributors, "timeToReview");
			setTotalAuthorInfo({
				totalContributors: contributors.length,
				commentsCount: totalCommentsCount,
				reviewedPrsCount: totalReviewedPrs,
				totalReviewTime: totalReviewTime,
			});
			setIsLoading(false);
		});

		// getContributorsList();
	}, []);

	function onFilterChange(timePeriod) {
		setFilterParam(timePeriod);
	}
	function onSearchChange(searchValue) {
		if (searchValue === "") {
			setAuthorList(authorListSourceRef.current);
		} else {
			let filteredAuthorList = authorListSourceRef.current.filter((author) => {
				return author.name.toLowerCase().includes(searchValue.toLowerCase());
			});
			setAuthorList(filteredAuthorList);
		}
	}
	function onRowClick(authorId) {
		router.push(`/pr-stats/author/${authorId}`);
	}
	return (
		<div className="flex flex-col h-screen bg-slate-200">
			<div className="grow-0 p-2 shrink-0 basis-12 border-b  bg-white">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<StatsInfo
				authorList={authorList}
				isLoading={isLoading}
				{...totalAuthorInfo}
			/>
			<AuthorsListTable
				isLoading={isLoading}
				authorList={authorList}
				onRowClick={onRowClick}
			/>
			{/* <div className="grow-0 p-2 shrink-0 basis-20 bg-white">
				<InfoCard {...totalAuthorInfo} />
			</div> */}
		</div>
	);
}

function AuthorsListTable({ isLoading, authorList, onRowClick }) {
	return (
		<div className="grow flex justify-center p-2 shrink basis-auto overflow-scroll border-b	h-full">
			<div className="h-full w-full bg-white flex rounded items-center justify-center">
				<TableComponent
					onRowClick={onRowClick}
					isLoading={isLoading}
					authorList={authorList}
				/>
			</div>
		</div>
	);
}

function StatsInfo({
	authorList,
	isLoading,
	totalContributors,
	commentsCount,
	reviewedPrsCount,
	totalReviewTime,
}) {
	console.log(authorList, "authorList");
	return (
		<div className="flex p-5 gap-8">
			<div className="flex-1	grid grid-cols-2 gap-8	">
				<StatsInfoCard title={"Total contributors"}>
					{isLoading ? <Loader /> : <div>{totalContributors}</div>}
				</StatsInfoCard>
				<StatsInfoCard title={"Total Comments"}>
					{isLoading ? <Loader /> : <div>{commentsCount}</div>}
				</StatsInfoCard>
				<StatsInfoCard title={"Total Reviewed prs"}>
					{isLoading ? <Loader /> : <div>{reviewedPrsCount}</div>}
				</StatsInfoCard>
				<StatsInfoCard title={"Total Review time"}>
					{isLoading ? (
						<Loader />
					) : (
						<div>{convertMsToTime(totalReviewTime)}</div>
					)}
				</StatsInfoCard>
			</div>
			<div className="flex-1 gap-8">
				<StatsInfoCard title={"Month chart"}>
					{isLoading ? (
						<Loader />
					) : (
						<LineChart
							className="mt-4 h-52"
							data={chartdata}
							index="date"
							categories={["CommentsCount"]}
							colors={["gray"]}
							yAxisWidth={30}
							onValueChange={(v) => setValue(v)}
							connectNulls={true}
						/>
					)}
				</StatsInfoCard>
			</div>
		</div>
	);
}
const chartdata = [
	{
		date: "Jan 23",
		CommentsCount: 45,
	},
	{
		date: "Feb 23",
		CommentsCount: 52,
	},
	{
		date: "Mar 23",
		CommentsCount: 48,
	},
	{
		date: "Apr 23",
		CommentsCount: 61,
	},
	{
		date: "May 23",
		CommentsCount: 55,
	},
	{
		date: "Jun 23",
		CommentsCount: 67,
	},
	{
		date: "Jul 23",
		CommentsCount: 60,
	},
	{
		date: "Aug 23",
		CommentsCount: 72,
	},
	{
		date: "Sep 23",
		CommentsCount: 65,
	},
	{
		date: "Oct 23",
		CommentsCount: 68,
	},
	{
		date: "Nov 23",
		CommentsCount: 74,
	},
	{
		date: "Dec 23",
		CommentsCount: 71,
	},
];
