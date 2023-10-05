// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAbPfJ0m5-M8AjJMsQiwSyo370B0h_pL0",
    authDomain: "expense-tracker-12796.firebaseapp.com",
    projectId: "expense-tracker-12796",
    storageBucket: "expense-tracker-12796.appspot.com",
    messagingSenderId: "438259002310",
    appId: "1:438259002310:web:33ed704647117f1732a0c7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
