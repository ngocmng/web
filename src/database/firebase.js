import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  // apiKey: "AIzaSyDI4OBEa7Zh7w0mo9G-dyYf0cjjSQx_uwI",
  // authDomain: "magic-post-21f3f.firebaseapp.com",
  // projectId: "magic-post-21f3f",
  // storageBucket: "magic-post-21f3f.appspot.com",
  // messagingSenderId: "968165012418",
  // appId: "1:968165012418:web:d60163f26d79ac342cdc5b",


  // apiKey: "AIzaSyAF3bIMKaPnfUULyQnEtQbgeBc7-XfZv80",
  // authDomain: "upload-file-demo-d1beb.firebaseapp.com",
  // projectId: "upload-file-demo-d1beb",
  // storageBucket: "upload-file-demo-d1beb.appspot.com",
  // messagingSenderId: "456204958602",
  // appId: "1:456204958602:web:e1cb5712a2db746dcda673"

  apiKey: "AIzaSyB4iOWmclb_p_YVm8QdUIO9o6RECiXYsvo",
  authDomain: "magicpost-224ab.firebaseapp.com",
  projectId: "magicpost-224ab",
  storageBucket: "magicpost-224ab.appspot.com",
  messagingSenderId: "439957681033",
  appId: "1:439957681033:web:e686930222e6e3e9d0e758",
  measurementId: "G-9VLC22ZD47"
});

const fireDB = getFirestore(app);
const fireAuth = getAuth(app);

await setPersistence(fireAuth, browserLocalPersistence);

export { fireDB, fireAuth };
