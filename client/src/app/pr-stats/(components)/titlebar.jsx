import React from "react";

import { Divider } from ".";

export function TitleBar({ title }) {
	return (
		<>
			<div className="m-4 text-slate-800">{title}</div>
			<Divider />
		</>
	);
}
