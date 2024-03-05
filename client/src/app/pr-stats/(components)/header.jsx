"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { RiHome2Line } from "@remixicon/react";
import { Icon } from "@tremor/react";

import styles from "./styles.module.css";

export function HeaderComponent({ title, avatarUrl, profileUrl }) {
	const router = useRouter();

	function getBackToDashboard() {
		router.push(`/pr-stats/author/`);
	}
	return (
		<div className="border-b-2 flex items-center h-14 gap-x-4 p-4">
			<Icon
				onClick={getBackToDashboard}
				icon={RiHome2Line}
				variant="shadow"
				tooltip="go back"
				size="md"
				borderRadius="Roundness-full"
				className={styles.backIcon}
				color="slate"
			/>
			<div className="rounded-full h-10 w-10 border-2">
				<img className="h-full w-full rounded-full" src={avatarUrl} alt="" />
			</div>
			<div className="flex flex-col">
				<span className="text-gray-500">{title}</span>
				<a
					href={profileUrl}
					target="_blank"
					className="text-blue-500 text-sm underline hover:text-blue-700 "
				>
					{profileUrl}
				</a>
			</div>
		</div>
	);
}
