// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCdFU1j4IVkDJr2_Q47dk_uMkaY_W17Ak",
    authDomain: "vehicle-notifier.firebaseapp.com",
    projectId: "vehicle-notifier",
    storageBucket: "vehicle-notifier.firebasestorage.app",
    messagingSenderId: "110579309562",
    appId: "1:110579309562:web:11d8cb2cf0a08ac7932243"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {
    app,
    auth
}