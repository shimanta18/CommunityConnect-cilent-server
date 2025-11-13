// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwaB-aPXjqJ1MvEPoeQIYxo9WzgrRH5tM",
  authDomain: "communityconnect-f1874.firebaseapp.com",
  projectId: "communityconnect-f1874",
  storageBucket: "communityconnect-f1874.firebasestorage.app",
  messagingSenderId: "2796310033",
  appId: "1:2796310033:web:096c4bb086730bfb58abb0",
  measurementId: "G-E1XH6ELS1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);