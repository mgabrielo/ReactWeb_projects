
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyBpsU6lbicM3Mfz3TKXPacifMW4MtcV974",
    authDomain: "eshop-a157c.firebaseapp.com",
    projectId: "eshop-a157c",
    storageBucket: "eshop-a157c.appspot.com",
    messagingSenderId: "33676513131",
    appId: "1:33676513131:web:84d91b95d6b138c2de062e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

