"use client";

import React, { useEffect, useState } from "react";

import { Toolbar } from "../../(components)/toolbar";
import { getAuthorList, getAuthorInfo } from "../../route";

export default function Page() {
	const [authors, setAuthors] = useState([]);
	const [loading, setLoading] = useState(true);

	async function onGetAuthorsList() {
		let authorsList = await getAuthorInfo("saravanan10393");
		console.log(authorsList, "authorsList");
		setAuthors(authorsList);
		setLoading(false);
	}

	useEffect(function onLoad() {
		onGetAuthorsList();
	}, []);

	function onFilterChange(event) {
		console.log(event, "filter chaneg");
	}
	function onSearchChange(event) {
		console.log(event, "searchValue");
	}
	return (
		<div className="flex flex-col border-2 border-sky-500 h-screen">
			<div className="grow-0 shrink-0 basis-12 border-2 border-lime-500">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<div className="grow shrink basis-auto overflow-scroll border-2 border-amber-500">
				<div className="m-2 border-2 h-full">Table more</div>
			</div>
			<div className="grow-0 shrink-0 basis-20 border-2 border-lime-500">
				Total info card
			</div>
		</div>
	);
}
