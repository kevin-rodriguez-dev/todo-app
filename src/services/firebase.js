// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdTbNcTaHsRWIapuTHnw8HikI4tlLLxfQ",
    authDomain: "todo-app-d0d03.firebaseapp.com",
    projectId: "todo-app-d0d03",
    storageBucket: "todo-app-d0d03.appspot.com",
    messagingSenderId: "417598562236",
    appId: "1:417598562236:web:e18a4a6cc37e583f2115b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
