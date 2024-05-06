"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
	addDoc,
	getDocs,
	collection,
	query,
	where,
	doc,
} from "firebase/firestore";

import { InfoCard, TableComponent, Toolbar } from "../../(components)/index";
import { AUTHORS_LIST } from "./MOCK";
import { TIME_PERIOD } from "@/app/constant";
import { getAuthorList } from "../../route";
import { db } from "@/app/firebaseConfig";
import { typescript } from "../../../../../next.config";

async function addDataToFirestore({ id, name, profileUrl, avatarUrl }) {
	try {
		let docRef = await addDoc(collection(db, "contributors"), {
			id: id,
			name: name,
			profileUrl: profileUrl,
			avatarUrl: avatarUrl,
		});
		console.log(docRef, "db docRef");
		return;
	} catch (error) {
		console.error(error, "error while adding data to db");
		return;
	}
}

async function getContributorsDataFromFirestore() {
	try {
		let authorQuerySnapshot = await getDocs(collection(db, "contributors"));
		let result = [];
		let authorInfoDoc = await getDocs(
			collection(db, "contributors", "sara-63cN2xz4Gm7yApAiGkrg", "authorInfo")
		);
		let doc = authorInfoDoc.docs;
		let fineData = doc[0];
		console.log(fineData.data(), "new typescript");
		authorInfoDoc.forEach(async (document) => {
			console.log({ ...document.data() }, "document totalReviewedPr*****");
		});

		authorQuerySnapshot.forEach(async (document) => {
			result.push({ newId: document.id, ...document.data() });
		});
		return result;
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}

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

	async function getContributorsList() {
		setIsLoading(true);
		await getAuthorList()
			.then((res = []) => {
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
			.finally(() => setIsLoading(false));
	}

	useEffect(function onLoad() {
		// getContributorsDataFromFirestore().then((contributors) => {
		// 	console.log(contributors, "contributorsList******");
		// });

		getContributorsDataFromFirestore().then((contributors = []) => {
			console.log(contributors, "contributors*******");
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
	function onRowClick(author) {
		router.push(`/pr-stats/author/${author.id}`);
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
