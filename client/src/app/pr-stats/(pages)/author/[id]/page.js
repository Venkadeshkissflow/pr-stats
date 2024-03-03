import React from "react";

import { getAuthorInfo } from "@/app/pr-stats/route";

export default async function AuthorInfo({ params }) {
	const authorInfo = await getAuthorInfo(params.id);
	console.log(authorInfo, "author info");
	return (
		<div>
			<span>author info</span>
			<span>{params.id}</span>
			<div>ji{authorInfo.name}</div>
		</div>
	);
}
