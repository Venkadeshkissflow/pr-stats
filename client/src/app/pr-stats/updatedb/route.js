import { NextResponse } from "next/server";
import {
	doc,
	getDoc,
	addDoc,
	setDoc,
	add,
	getDocs,
	collection,
	query,
	where,
} from "firebase/firestore";

import { MOCK_DATA, COLLECTIONS } from "./mock";
import { db } from "@/app/firebaseConfig";

const newDocData = {
	commentsCount: 2,
	pullRequestId: "new-pr-id-by-mock-001",
	reviewTime: 492000,
	submittedAt: "2022-09-25T17:30:33.000Z",
};

const githubUserId = "saravanan10393";

async function updateUserReviewedPr(contributor, prinfo) {
	const docRef = await addDoc(
		collection(db, "contributors", contributor.id, "reviews"),
		prinfo
	);
	return docRef.id;
}

async function getReviewerInfo(filterContributor) {
	const querySnapshot = await getDocs(filterContributor);
	let existingContributors = [];
	querySnapshot.forEach((doc) => {
		existingContributors.push({ id: doc.id, data: doc.data() });
	});
	return existingContributors;
}

export async function POST(request) {
	let jsonAsString = await new Response(request.body).text();
	let data = JSON.parse(jsonAsString);

	const contributorsRef = collection(db, "contributors");

	data["reviewers"].forEach(async (reviewer) => {
		let userId = reviewer["author"]["login"];
		const filterContributor = query(
			contributorsRef,
			where("githubUserId", "==", userId)
		);

		let existingContributors = await getReviewerInfo(filterContributor);

		if (existingContributors.length > 0) {
			let [contributor] = existingContributors;
			let reviewedPrList = reviewer["reviews"];
			reviewedPrList.forEach(async (prinfo) => {
				let updatedDocId = await updateUserReviewedPr(contributor, prinfo);
				console.log({ updatedDocId }, "updatedDocId");
			});
		}
	});
	// let queryList = querySnapshot.map((author) => author.data());
	return NextResponse.json({
		message: "Success ping pong",
		data,
	});
}
