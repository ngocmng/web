import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyAF3bIMKaPnfUULyQnEtQbgeBc7-XfZv80",
    authDomain: "upload-file-demo-d1beb.firebaseapp.com",
    projectId: "upload-file-demo-d1beb",
    storageBucket: "upload-file-demo-d1beb.appspot.com",
    messagingSenderId: "456204958602",
    appId: "1:456204958602:web:e1cb5712a2db746dcda673"
});

const fireDB = getFirestore(app);
const fireAuth = getAuth(app);

await setPersistence(fireAuth, browserLocalPersistence);

export { fireDB, fireAuth };