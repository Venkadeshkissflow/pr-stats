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

async function getDocsList(dbInfo) {
	return await getDocs(collection(...dbInfo));
}

async function getPrInfo(authorId) {
	let prInfoCollectionSnapshot = await getDocsList([
		db,
		"contributors",
		authorId,
		"reviews",
	]);
	return prInfoCollectionSnapshot.docs[0].data();
}

function getAuthorsList(authorsDocList) {
	return authorsDocList.map((authorInfoDocSnapshot) => {
		let prInfo = getPrInfo(authorInfoDocSnapshot.id);
		return { ...authorInfoDocSnapshot.data(), ...prInfo };
	});
}

export async function getContributorsList() {
	try {
		let collectionSnapshot = await getDocsList([db, "contributors"]);
		return getAuthorsList(collectionSnapshot.docs);
	} catch (error) {
		console.error(error, "failed to fetch contributors list");
	}
}
