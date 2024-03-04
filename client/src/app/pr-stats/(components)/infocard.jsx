"use client";

import React from "react";

import { Card } from "@tremor/react";

export function InfoCard() {
	return (
		<Card className=" flex justify-between rounded p-0">
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total contributors</p>
				<span className="font-medium">22</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total Comments</p>
				<span className="font-medium">22</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col border-r">
				<p className="text-slate-800 font-bold">Total Reviews</p>
				<span className="font-medium">22</span>
			</div>
			<div className="flex-1 p-2 flex items-center flex-col">
				<p className="text-slate-800 font-bold">Total Review time</p>
				<span className="font-medium">22</span>
			</div>
		</Card>
	);
}
