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

function reviewsCollectionKey(contributorId) {
	return [db, "contributors", contributorId, "reviews"];
}

function statsCollectionKey(contributorId) {
	return [db, "contributors", contributorId, "stats"];
}

async function createDoc(collectionKey, documentData) {
	let collectionRef = collection(...collectionKey);

	const docRef = await addDoc(collectionRef, documentData);
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

export async function batchUpdate(data) {
	const contributorsRef = collection(db, "contributors");

	data["reviewers"].forEach(async (reviewer) => {
		const authorInfo = reviewer["author"];
		const userId = authorInfo["login"];
		const reviewedPrs = reviewer["reviews"];
		const stats = reviewer["stats"];

		const filterContributor = query(
			contributorsRef,
			where("githubUserId", "==", userId)
		);

		let existingContributors = await getData(filterContributor);

		if (existingContributors.length > 0) {
			let [contributor] = existingContributors;
			reviewedPrs.forEach(async (reviewInfo) => {
				let updatedDocId = await createDoc(
					reviewsCollectionKey(contributor.id),
					reviewInfo
				);
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

			//create collection and update authorInfo
			const docRef = await addDoc(
				collection(db, "contributors"),
				contributorData
			);

			//update stats
			await createDoc(statsCollectionKey(docRef.id), stats);

			//update reviewed prs
			reviewedPrs.forEach(async (prInfo) => {
				await createDoc(reviewsCollectionKey(docRef.id), prInfo);
			});

			console.log("new data ", { newData: docRef.id });
		}
	});
}
