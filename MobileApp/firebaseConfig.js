import { messaging } from '@react-native-firebase/messaging';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAEbsRdccLn5O9vg7leBRxu5jddVnGeeuc",
    authDomain: "teckstik1.firebaseapp.com",
    projectId: "teckstik1",
    storageBucket: "teckstik1.appspot.com",
    messagingSenderId: "233823968881",
    appId: "1:233823968881:web:0b6b62943c674a34f5c5d0",
    measurementId: "G-EW3RQCKCFC"
};


export const appMessage = initializeApp(firebaseConfig)
