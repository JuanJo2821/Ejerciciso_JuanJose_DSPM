import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyClRJ-_xuGJnyrOytStvHBfhc18YQY2h6I",
  authDomain: "juanproyecto-924b2.firebaseapp.com",
  databaseURL: "https://juanproyecto-924b2-default-rtdb.firebaseio.com",
  projectId: "juanproyecto-924b2",
  storageBucket: "juanproyecto-924b2.firebasestorage.app",
  messagingSenderId: "981103883875",
  appId: "1:981103883875:web:47fcfe715c9244e11aaa56"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);

export { app, auth, db, rtdb };
