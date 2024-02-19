import { TopReviewers } from "./topreviewers";
import {
	getContributors,
	pullRequestList,
	getCommentsCount,
	getAuthorList,
} from "../service";
import { TIME_RANGE } from "@/app/constant";

export default async function CommonInfo() {
	const contributorsList = await getContributors();
	const pullRequestsList = await pullRequestList();
	const { commentsCount } = await getCommentsCount();
	const authorList = await getAuthorList();

	return (
		<>
			<header className="flex justify-end w-full border-b-2 p-2">
				<select className="border-2 p-2 rounded-lg">
					{Object.values(TIME_RANGE).map((filterInfo) => {
						return (
							<option key={filterInfo.id} value={filterInfo.id}>
								{filterInfo.label}
							</option>
						);
					})}
				</select>
			</header>
			{/* <h1>Common info</h1> */}
			<div className="p-4">
				<div className="flex justify-around p-4">
					<InfoCard
						title={"Total Contributors"}
						value={contributorsList.length}
					/>
					<InfoCard title={"Total Open prs"} value={pullRequestsList.length} />
					<InfoCard title={"Total Comments"} value={commentsCount} />
				</div>
				<TopReviewers authorList={authorList} />
			</div>
		</>
	);
}

function InfoCard({ title, value }) {
	return (
		<div className="border-2 rounded-lg w-48">
			<div className="flex border-b-2 justify-center font-semibold p-3">
				{title}
			</div>
			<div className="h-12 flex justify-center items-center">{value}</div>
		</div>
	);
}
