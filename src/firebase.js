// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: YOUR_API_KEY,
//   authDomain: YOUR_AUTHDOMAIN,
//   projectId: YOUR_PROJECTID,
//   storageBucket: YOUR_STORAGEBUCKET,
//   messagingSenderId: YOUR_MESSAGING_SENDER_ID,
//   appId: YOUR_APPID
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)

// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKXZAn0CvosLl_1bhUjblycKgre7mlEf0",
  authDomain: "todo-app-889a3.firebaseapp.com",
  projectId: "todo-app-889a3",
  storageBucket: "todo-app-889a3.appspot.com",
  messagingSenderId: "39587644386",
  appId: "1:39587644386:web:c04591a493f97c7fcaafbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)