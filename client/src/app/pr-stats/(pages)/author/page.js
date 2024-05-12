"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InfoCard, TableComponent, Toolbar } from "../../(components)/index";
import { AUTHORS_LIST } from "./MOCK";
import { TIME_PERIOD } from "@/app/constant";
import { getContributorsList } from "../query";

export default function Page() {
	const router = useRouter();

	const [filterParam, setFilterParam] = useState(TIME_PERIOD.DEFAULT);
	const [authorList, setAuthorList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalAuthorInfo, setTotalAuthorInfo] = useState({
		totalContributors: 0,
		commentsCount: 0,
		reviewedPrsCount: 0,
		totalReviewTime: 0,
	});

	function filterAuthorInfo(authorList = [], keyToFilter) {
		return authorList.reduce((acc, currentValue) => {
			return acc + currentValue[keyToFilter];
		}, 0);
	}

	useEffect(function onLoad() {
		getContributorsList().then((contributors) => {
			setAuthorList(contributors);
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
			setAuthorList(AUTHORS_LIST);
		} else {
			let filteredAuthorList = AUTHORS_LIST.filter((author) => {
				return author.name.toLowerCase().includes(searchValue.toLowerCase());
			});
			setAuthorList(filteredAuthorList);
		}
	}
	function onRowClick(authorId) {
		router.push(`/pr-stats/author/${authorId}`);
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="grow-0 p-2 shrink-0 basis-12 border-b  bg-white">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<AuthorsListTable
				isLoading={isLoading}
				authorList={authorList}
				onRowClick={onRowClick}
			/>
			<div className="grow-0 p-2 shrink-0 basis-20 bg-white">
				<InfoCard {...totalAuthorInfo} />
			</div>
		</div>
	);
}

function AuthorsListTable({ isLoading, authorList, onRowClick }) {
	return (
		<div className="grow flex justify-center p-2 shrink basis-auto overflow-scroll border-b  bg-slate-200	h-full">
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
