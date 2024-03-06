"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InfoCard, TableComponent, Toolbar } from "../../(components)/index";
import { AUTHORS_LIST } from "./MOCK";
import { TIME_PERIOD } from "@/app/constant";
import { getAuthorList } from "../../route";

export default function Page() {
	const router = useRouter();

	const [filterParam, setFilterParam] = useState(TIME_PERIOD.DEFAULT);
	const [authorList, setAuthorList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [totalAuthorInfo, setTotalAuthorInfo] = useState({
		totalContributors: 0,
		commentsCount: 0,
		reviewedPrsCount: 0,
		totalReviewTime: 0,
	});

	function filterAuthorInfo(authorList, keyToFilter) {
		return authorList.reduce((acc, currentValue) => {
			return acc + currentValue[keyToFilter];
		}, 0);
	}

	async function getContributorsList() {
		await getAuthorList()
			.then((res) => {
				setAuthorList(res);
				let totalCommentsCount = filterAuthorInfo(res, "totalComments");
				let totalReviewedPrs = filterAuthorInfo(res, "totalReviews");
				let totalReviewTime = filterAuthorInfo(res, "timeToReview");
				setTotalAuthorInfo({
					totalContributors: res.length,
					commentsCount: totalCommentsCount,
					reviewedPrsCount: totalReviewedPrs,
					totalReviewTime: totalReviewTime,
				});
			})
			.catch((errRes) => console.log(errRes, "Error response"))
			.finally(() => setLoading(false));
	}

	useEffect(function onLoad() {
		getContributorsList();
	}, []);

	function onFilterChange(timePeriod) {
		console.log(timePeriod, "filter chaneg");
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
			console.log(filteredAuthorList, "filteredAuthorList");
		}
		console.log(searchValue, "searchValue");
	}
	function onRowClick(author) {
		console.log(author, "author info");
		router.push(`/pr-stats/author/${author.id}`);
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="grow-0 p-2 shrink-0 basis-12 border-b  bg-white">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<div className="grow flex justify-center p-2 shrink basis-auto overflow-scroll border-b  bg-slate-200	h-full">
				<TableComponent
					onRowClick={onRowClick}
					isLoading={loading}
					authorList={authorList}
				/>
			</div>
			<div className="grow-0 p-2 shrink-0 basis-20 bg-white">
				<InfoCard {...totalAuthorInfo} />
			</div>
		</div>
	);
}
