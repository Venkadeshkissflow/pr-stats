"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { InfoCard, Table, Toolbar } from "../../(components)/index";

import { AUTHORS_LIST } from "./MOCK";

export default function Page() {
	const router = useRouter();

	function onFilterChange(event) {
		console.log(event, "filter chaneg");
	}
	function onSearchChange(event) {
		console.log(event, "searchValue");
	}
	function onRowClick(author) {
		console.log(author, "author info");
		router.push(`/pr-stats/author/${author.id}`);
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="grow-0 p-2 shrink-0 basis-12 border-b-2">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<div className="grow flex justify-center p-2 shrink basis-auto overflow-scroll border-b-2">
				<Table onRowClick={onRowClick} authorList={AUTHORS_LIST} />
			</div>
			<div className="grow-0 p-2 shrink-0 basis-20 ">
				<InfoCard />
			</div>
		</div>
	);
}
