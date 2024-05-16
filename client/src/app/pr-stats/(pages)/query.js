import { doc, getDoc, addDoc, getDocs, collection } from "firebase/firestore";

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
	URL: "urls",
};

function getUrlCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId, COLLECTION.URL];
}

function getReviewedPrCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId, COLLECTION.REVIEWS];
}

function getPrStatsCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId, COLLECTION.STATS];
}

function getContributorsCollectionKey() {
	return [db, COLLECTION.CONTRIBUTORS];
}

function getAuthorInfoCollectionKey(authorId) {
	return [db, COLLECTION.CONTRIBUTORS, authorId];
}

async function getDocsListFromCollection(dbInfo) {
	return await getDocs(collection(...dbInfo));
}

async function getPrStatsInfo(authorId) {
	let collectionSnap = await getDocsListFromCollection(
		getPrStatsCollectionKey(authorId)
	);
	return collectionSnap.docs[0].data();
}

async function getAuthorWithReviewedPr(docSnap) {
	let prInfo = await getPrStatsInfo(docSnap.id);
	let authotInfo = docSnap.data();
	return { ...prInfo, ...authotInfo, authorId: docSnap.id };
}

async function getAuthorsList(authorsDocList) {
	let result = authorsDocList.map(getAuthorWithReviewedPr);
	return Promise.all(result).then((data) => data);
}

export async function getContributorsList() {
	try {
		let collectionSnapshot = await getDocsListFromCollection(
			getContributorsCollectionKey()
		);
		return getAuthorsList(collectionSnapshot.docs);
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}

function getReviewedPrsList(docsList) {
	return docsList.map((doc) => doc.data());
}

export async function getReviewedPrListQuery(authorId) {
	try {
		let collectionSnapshot = await getDocsListFromCollection(
			getReviewedPrCollectionKey(authorId)
		);
		return getReviewedPrsList(collectionSnapshot.docs);
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}

export async function getReviewTimeUrl(authorId) {
	try {
		let collectionSnapshot = await getDocsListFromCollection(
			getUrlCollectionKey(authorId)
		);
		let reviewTime = collectionSnapshot.docs[0].data();
		return reviewTime;
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}

export async function getAuthorInfoQuery(authorId) {
	try {
		const docRef = doc(...getAuthorInfoCollectionKey(authorId));
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}
