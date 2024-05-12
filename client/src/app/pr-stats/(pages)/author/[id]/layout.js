import React from "react";

import { HeaderComponent } from "@/app/pr-stats/(components)";
import { getAuthorInfoQuery } from "../../query";

export default async function AuthorInfoLayout({ children, params }) {
	const authorInfo = await getAuthorInfoQuery(params.id);

	const { name, avatarUrl, profileUrl } = authorInfo;

	return (
		<div className="flex flex-col h-screen">
			<HeaderComponent
				title={name}
				avatarUrl={avatarUrl}
				profileUrl={profileUrl}
			/>
			{children}
		</div>
	);
}
