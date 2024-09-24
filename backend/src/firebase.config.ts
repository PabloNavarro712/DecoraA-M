// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3sF9wQ59BS98T2z4B29qLe0ephKrvkcE",
  authDomain: "equipo-4-f104b.firebaseapp.com",
  projectId: "equipo-4-f104b",
  storageBucket: "equipo-4-f104b.appspot.com",
  messagingSenderId: "618249517628",
  appId: "1:618249517628:web:aee9438d19ef0dbc98e139",
  measurementId: "G-E12XZZX0HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseDataBase = getDatabase(app);