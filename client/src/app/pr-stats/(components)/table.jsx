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
import { Loader } from ".";

export function TableComponent({ isLoading, authorList, onRowClick }) {
	if (isLoading) {
		return <Loader />;
	}

	if (authorList.length === 0) {
		return (
			<div className="flex flex-col">
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
		<Table className="w-full rounded h-full">
			<TableHead className="bg-slate-500">
				<TableRow>
					<TableHeaderCell className="text-white	">Name</TableHeaderCell>
					<TableHeaderCell className="text-center text-white">
						Total comments
					</TableHeaderCell>
					<TableHeaderCell className="text-center text-white	">
						Total Reviewed prs
					</TableHeaderCell>
					<TableHeaderCell className="text-center text-white	">
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
						<TableCell className="text-center">
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
