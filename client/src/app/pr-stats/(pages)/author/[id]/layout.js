import React from "react";

import { HeaderComponent } from "@/app/pr-stats/(components)";
import { getAuthorInfo } from "@/app/pr-stats/route";

export default async function AuthorInfoLayout({ children, params }) {
	console.log(params, "params");
	const authorInfo = await getAuthorInfo(params.id);

	const { name, avatarUrl } = authorInfo;

	console.log(authorInfo, "params authorInfo");

	return (
		<div className="flex flex-col h-screen">
			<HeaderComponent title={name} avatarUrl={avatarUrl} />
			{children}
		</div>
	);
}
