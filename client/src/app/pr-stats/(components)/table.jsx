"use client";

import { convertMsToTime } from "../util";

export function Table({ authorList, onRowClick }) {
	return (
		<div className="flex flex-col w-full">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-slate-500">
								<tr>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Name
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Total comments
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Total Reviews
									</th>
									<th
										scope="col"
										className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
									>
										Total review time
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{authorList.map((person) => (
									<tr key={person.id} onClick={() => onRowClick(person)}>
										<td className="px-6 py-4 whitespace-nowrap">
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
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-900">
												{person.totalComments}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm text-gray-500">
												{person.totalReviews}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className="px-2 inline-flex text-xs leading-5
                          font-semibold rounded-full bg-green-100 text-green-800"
											>
												{convertMsToTime(person.timeToReview)}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
