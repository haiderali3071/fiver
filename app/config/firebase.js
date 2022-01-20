import { initializeApp } from "firebase/app";
const firebaseConfig = {
    apiKey: "AIzaSyAKMWjZdvSgi_Nm0omzzfFwbQ_8O4ijDqc",
    authDomain: "thelingo-e10a4.firebaseapp.com",
    projectId: "thelingo-e10a4",
    storageBucket: "thelingo-e10a4.appspot.com",
    messagingSenderId: "470826115574",
    appId: "1:470826115574:web:a150d60bd410d8826127d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;