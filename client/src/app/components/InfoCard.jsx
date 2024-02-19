import React from "react";

export function InfoCard({ title, value }) {
	return (
		<div className="border-2 rounded-lg w-48">
			<div className="flex border-b-2 justify-center font-semibold p-3">
				{title}
			</div>
			<div className="h-12 flex justify-center items-center">{value}</div>
		</div>
	);
}
