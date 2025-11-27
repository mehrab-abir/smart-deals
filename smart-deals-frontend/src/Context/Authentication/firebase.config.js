// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlSc_kSJTiX8X_GQLgK1GoabK1JWhxuHc",
    authDomain: "smart-deals-01.firebaseapp.com",
    projectId: "smart-deals-01",
    storageBucket: "smart-deals-01.firebasestorage.app",
    messagingSenderId: "1023923062554",
    appId: "1:1023923062554:web:ffecba2864582357840ea3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)