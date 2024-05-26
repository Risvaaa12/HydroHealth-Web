import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // apiKey: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_APIKEY}`,
  // authDomain: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_AUTHDOMAIN}`,
  // projectId: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_PROJECTID}`,
  // storageBucket: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_STORAGEBUCKET}`,
  // messagingSenderId: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_MESSAGINGSENDERID}`,
  // appId: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_APPID}`,
  // measurementId: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_MEASUREMENTID}`,
  // databaseURL: `${process.env.NEXT_PUBLIC_VERCEL_FIREBASE_DATABASEURL}`,
  apiKey: "AIzaSyDcZxAPE_jGTKsiDgtpwEC02to8N4KKsA0",
  authDomain: "hydrohealth-project-9cf6c.firebaseapp.com",
  projectId: "hydrohealth-project-9cf6c",
  storageBucket: "hydrohealth-project-9cf6c.appspot.com",
  messagingSenderId: "7403237764",
  appId: "1:7403237764:web:f569a3f8a9f69f22586dd1",
  measurementId: "G-XGSSWL95PT",
  databaseURL: "https://hydrohealth-project-9cf6c.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
let analytics = null;

if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const storage = getStorage(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { app, analytics, storage, auth, firestore, database };