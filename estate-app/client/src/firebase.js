// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "grey-estate.firebaseapp.com",
    projectId: "grey-estate",
    storageBucket: "grey-estate.appspot.com",
    messagingSenderId: "597030227946",
    appId: "1:597030227946:web:c09520dc3043ed38476c93"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);