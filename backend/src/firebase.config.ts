// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyB2Ml1abSSrFPkjffXldWFb1uyRJfuWPUU',
  authDomain: 'equipo-4---decoram-ef008.firebaseapp.com',
  projectId: 'equipo-4---decoram-ef008',
  storageBucket: 'equipo-4---decoram-ef008.firebasestorage.app',
  messagingSenderId: '1050852957898',
  appId: '1:1050852957898:web:e8785f55a5adb607aede33',
  measurementId: 'G-YD64PNDM9X',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const firebaseDataBase = getDatabase(app);
