// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBKN13yxq9sNs6xDJFBqm_MO7pWKYarKvQ",
	authDomain: "learning-project-6d9a6.firebaseapp.com",
	databaseURL:
		"https://learning-project-6d9a6-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "learning-project-6d9a6",
	storageBucket: "learning-project-6d9a6.appspot.com",
	messagingSenderId: "855146870936",
	appId: "1:855146870936:web:17ab14bba24fa795c4f8ed",
	measurementId: "G-HH2D5F8KXN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
