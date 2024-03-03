"use client";

import React from "react";

import { InfoCard, Table, Toolbar } from "../../(components)/index";

import { AUTHORS_LIST } from "./MOCK";

export default function Page() {
	function onFilterChange(event) {
		console.log(event, "filter chaneg");
	}
	function onSearchChange(event) {
		console.log(event, "searchValue");
	}
	return (
		<div className="flex flex-col h-screen">
			<div className="grow-0 p-2 shrink-0 basis-12 border-b-2">
				<Toolbar onFilter={onFilterChange} onSearch={onSearchChange} />
			</div>
			<div className="grow flex justify-center p-2 shrink basis-auto overflow-scroll border-b-2">
				<Table authorList={AUTHORS_LIST} />
			</div>
			<div className="grow-0 p-2 shrink-0 basis-20 ">
				<InfoCard />
			</div>
		</div>
	);
}
