// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx4UGorOrMFBym-mqTxLT3ZsR2017uEeM",
  authDomain: "iottesproject.firebaseapp.com",
  databaseURL: "https://iottesproject-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iottesproject",
  storageBucket: "iottesproject.firebasestorage.app",
  messagingSenderId: "171351159266",
  appId: "1:171351159266:web:32ce1de7caadfed92c09bb"
};

// Initialize Firebase
const APP = initializeApp(firebaseConfig);

export default APP;