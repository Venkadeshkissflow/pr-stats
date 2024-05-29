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

import { db } from "@/app/firebaseConfig";

async function updateUserReviewedPr(contributorId, prinfo) {
	let reviewedPrsRef = collection(db, "contributors", contributorId, "reviews");

	const docRef = await addDoc(reviewedPrsRef, prinfo);
	return docRef.id;
}

async function getData(querySnap) {
	const querySnapshot = await getDocs(querySnap);
	let list = [];
	querySnapshot.forEach((doc) => {
		list.push({ id: doc.id, data: doc.data() });
	});
	return list;
}

export async function POST(request) {
	let jsonAsString = await new Response(request.body).text();
	let data = JSON.parse(jsonAsString);

	const contributorsRef = collection(db, "contributors");

	data["reviewers"].forEach(async (reviewer) => {
		const authorInfo = reviewer["author"];
		const userId = authorInfo["login"];
		const reviewedPrs = reviewer["reviews"];

		const filterContributor = query(
			contributorsRef,
			where("githubUserId", "==", userId)
		);

		let existingContributors = await getData(filterContributor);

		if (existingContributors.length > 0) {
			let [contributor] = existingContributors;
			reviewedPrs.forEach(async (prinfo) => {
				let updatedDocId = await updateUserReviewedPr(contributor.id, prinfo);
				console.log({ updatedDocId }, "updatedDocId");
			});
		} else {
			console.log("new contributor", authorInfo);
			const { id, login, ...restInfo } = authorInfo;
			let contributorData = {
				...restInfo,
				profileUrl: authorInfo["url"],
				name: authorInfo["login"],
				githubUserId: authorInfo["login"],
			};
			const docRef = await addDoc(
				collection(db, "contributors"),
				contributorData
			);

			reviewedPrs.forEach((prInfo) => {
				updateUserReviewedPr(docRef.id, prInfo);
			});

			console.log("new data ", { newData: docRef.id });
		}
	});
	return NextResponse.json({
		message: "Success ping pong",
		data,
	});
}
