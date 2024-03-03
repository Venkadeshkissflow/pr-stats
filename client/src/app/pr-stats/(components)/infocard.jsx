"use client";

import React from "react";

import { Card } from "@tremor/react";

export function InfoCard() {
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
