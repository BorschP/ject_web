// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage , ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWavRRKaobRznVvIO3Pf7ASqcu_R0YEzo",
  authDomain: "db-pj-5e51a.firebaseapp.com",
  projectId: "db-pj-5e51a",
  storageBucket: "db-pj-5e51a.appspot.com",
  messagingSenderId: "162793164304",
  appId: "1:162793164304:web:35c0cd7b7b16575d3cc495",
  measurementId: "G-C5JFJ08FCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//connect database
export const db = getFirestore(app);

//connect storage
export const storage = getStorage(app);


