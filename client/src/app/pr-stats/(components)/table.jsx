"use client";

import { convertMsToTime } from "../util";

import { Icon } from "@tremor/react";
import { RiSearchEyeLine } from "@remixicon/react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";

import styles from "./styles.module.css";

export function TableComponent({ isLoading, authorList, onRowClick }) {
	if (isLoading) {
		return <span>loading......</span>;
	}

	if (authorList.length === 0) {
		return (
			<div className="h-full w-full bg-white flex flex-col items-center justify-center">
				<Icon
					icon={RiSearchEyeLine}
					variant="simple"
					size="xl"
					borderRadius="Roundness"
				/>
				No data found
			</div>
		);
	}

	return (
		<Table className="w-full rounded">
			<TableHead className="bg-slate-500">
				<TableRow>
					<TableHeaderCell className="text-white	">Name</TableHeaderCell>
					<TableHeaderCell className="text-right text-white">
						Total comments
					</TableHeaderCell>
					<TableHeaderCell className="text-white	">
						Total Reviews
					</TableHeaderCell>
					<TableHeaderCell className="text-white	">
						Total review time
					</TableHeaderCell>
				</TableRow>
			</TableHead>

			<TableBody className={styles.tableComponent}>
				{authorList.map((person) => (
					<TableRow
						onClick={() => onRowClick(person)}
						className="bg-white hover:bg-slate-100 cursor-pointer"
					>
						<TableCell>
							<div className="flex items-center">
								<div className="flex-shrink-0 h-10 w-10">
									<img
										className="h-10 w-10 rounded-full"
										src={person.avatarUrl}
										alt=""
									/>
								</div>
								<div className="ml-4">
									<div className="text-sm font-medium text-gray-900">
										{person.name}
									</div>
									<div className="text-sm text-gray-500">
										{person.profileUrl}
									</div>
								</div>
							</div>
						</TableCell>
						<TableCell className="text-center text-sm text-gray-900">
							{person.totalComments}
						</TableCell>
						<TableCell className="text-center text-sm text-gray-500">
							{person.totalReviews}
						</TableCell>
						<TableCell>
							<span
								onClick={(e) => e.stopPropagation()}
								className="px-2 inline-flex text-xs leading-5
				  font-semibold rounded-full bg-green-100 text-green-800"
							>
								{convertMsToTime(person.timeToReview)}
							</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
