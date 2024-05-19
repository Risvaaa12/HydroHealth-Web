import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyA2CcIfOGZ9buRrhjGbU6OzpfWtABeiO84",
  authDomain: "hydrohealth-project.firebaseapp.com",
  projectId: "hydrohealth-project",
  storageBucket: "hydrohealth-project.appspot.com",
  messagingSenderId: "956354319325",
  appId: "1:956354319325:web:a144be4c942cc7a092dc34",
  measurementId: "G-4E63JLT05Z",
  databaseURL: "https://hydrohealth-project-default-rtdb.asia-southeast1.firebasedatabase.app/",
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
