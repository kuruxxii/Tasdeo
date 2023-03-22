// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiD1T_2aXamW_kTVGy2iSNmJ7GT3tbYKY",
  authDomain: "tasdeo-6538e.firebaseapp.com",
  projectId: "tasdeo-6538e",
  storageBucket: "tasdeo-6538e.appspot.com",
  messagingSenderId: "317205082010",
  appId: "1:317205082010:web:77f868a8264efcd47b9423",
  measurementId: "G-1H7BVB3C5E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
