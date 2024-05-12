import { addDoc, getDocs, collection } from "firebase/firestore";

import { db } from "@/app/firebaseConfig";

// async function addDataToFirestore({ id, name, profileUrl, avatarUrl }) {
// 	try {
// 		let docRef = await addDoc(collection(db, "contributors"), {
// 			id: id,
// 			name: name,
// 			profileUrl: profileUrl,
// 			avatarUrl: avatarUrl,
// 		});
// 		console.log(docRef, "db docRef");
// 		return;
// 	} catch (error) {
// 		console.error(error, "error while adding data to db");
// 		return;
// 	}
// }

const COLLECTION = {
	CONTRIBUTORS: "contributors",
	REVIEWS: "reviews",
	STATS: "stats",
};

function getReviewedPrCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId, COLLECTION.REVIEWS];
}

function getPrStatsCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId, COLLECTION.STATS];
}

function getContributorsCollectionKey() {
	return [db, COLLECTION.CONTRIBUTORS];
}

async function getDocsList(dbInfo) {
	return await getDocs(collection(...dbInfo));
}

async function getPrStatsInfo(authorId) {
	let collectionSnap = await getDocsList(getPrStatsCollectionKey(authorId));
	return collectionSnap.docs[0].data();
}

async function getAuthorWithReviewedPr(docSnap) {
	let prInfo = await getPrStatsInfo(docSnap.id);
	let authotInfo = docSnap.data();
	return { ...prInfo, ...authotInfo };
}

async function getAuthorsList(authorsDocList) {
	let result = authorsDocList.map(getAuthorWithReviewedPr);
	return Promise.all(result).then((data) => data);
}

export async function getContributorsList() {
	try {
		let collectionSnapshot = await getDocsList(getContributorsCollectionKey());
		return getAuthorsList(collectionSnapshot.docs);
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}
