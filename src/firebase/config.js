// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClRJ-_xuGJnyrOytStvHBfhc18YQY2h6I",
  authDomain: "juanproyecto-924b2.firebaseapp.com",
  projectId: "juanproyecto-924b2",
  storageBucket: "juanproyecto-924b2.firebasestorage.app",
  messagingSenderId: "981103883875",
  appId: "1:981103883875:web:47fcfe715c9244e11aaa56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };