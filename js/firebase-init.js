/* js/firebase-init.js */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
// import { getAnalytics } from
//   "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js"; // если пригодится

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqQ0AuQa-U-QFeFSDpgNJNDzGiazS4cBk",
  authDomain: "standup-tallinn.firebaseapp.com",
  projectId: "standup-tallinn",
  //   storageBucket: "standup-tallinn.firebasestorage.app",
  storageBucket: "standup-tallinn.appspot.com",
  messagingSenderId: "973366360655",
  appId: "1:973366360655:web:0b4b9aa40ea1e23488483a",
  measurementId: "G-SQHTT1MYKK",
};

// Initialize Firebase
// const analytics = getAnalytics(app);

/* Экспортируем, чтобы form.js мог импортировать напрямую */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection, getDocs };
