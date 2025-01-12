import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCdFU1j4IVkDJr2_Q47dk_uMkaY_W17Ak",
    authDomain: "vehicle-notifier.firebaseapp.com",
    projectId: "vehicle-notifier",
    storageBucket: "vehicle-notifier.firebasestorage.app",
    messagingSenderId: "110579309562",
    appId: "1:110579309562:web:11d8cb2cf0a08ac7932243"
};

const app = initializeApp(firebaseConfig);

export default app;