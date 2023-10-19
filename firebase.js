import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: "insta-clone-cb289.firebaseapp.com",
    projectId: "insta-clone-cb289",
    storageBucket: "insta-clone-cb289.appspot.com",
    messagingSenderId: "621953024096",
    appId: "1:621953024096:web:92edfdd7d2ee0f40300305"
  
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage();

export { db, storage }