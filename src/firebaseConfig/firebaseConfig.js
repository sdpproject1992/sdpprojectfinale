// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA0bVpQJ6uWAxPGNDRCSE7bAQTK327kEs",
  authDomain: "sdpproject-110ff.firebaseapp.com",
  databaseURL: "https://sdpproject-110ff-default-rtdb.firebaseio.com/",
  projectId: "sdpproject-110ff",
  storageBucket: "sdpproject-110ff.appspot.com",
  messagingSenderId: "788352524569",
  appId: "1:788352524569:web:9aba5c423c287630366588",
  measurementId: "G-6JW3F7L2FT"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);