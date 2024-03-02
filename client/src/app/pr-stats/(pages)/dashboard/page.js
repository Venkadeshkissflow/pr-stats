"use client";

import React from "react";

import { Toolbar } from "../../(components)/toolbar";
import { AUTHORS_LIST } from "./MOCK";
import { Table } from "../../(components)/table";

import { Card } from "@tremor/react";

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

function InfoCard() {
	return (
		<Card className=" flex justify-between rounded">
			<div className="flex-1 p-2 flex align-center flex-col border-r-2">
				<p>Total contributors</p>
				<span>22</span>
			</div>
			<div className="flex-1 p-2 flex align-center flex-col border-r-2">
				<p>Total Comments</p>
				<span>22</span>
			</div>
			<div className="flex-1 p-2 flex align-center flex-col border-r-2">
				<p>Total Reviews</p>
				<span>22</span>
			</div>
			<div className="flex-1 p-2 flex align-center flex-col border-r-2">
				<p>Total Review time</p>
				<span>22</span>
			</div>
		</Card>
	);
}
