// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.FIREBASE_API_KEY,
  authDomain: "mern-estate-d197b.firebaseapp.com",
  projectId: "mern-estate-d197b",
  storageBucket: "mern-estate-d197b.appspot.com",
  messagingSenderId: "672257855381",
  appId: "1:672257855381:web:c377dae5fc9294bcbf709c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);