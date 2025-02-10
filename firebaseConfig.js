import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.FIREBASE_API_KEY,
  authDomain: Constants.expoConfig.extra.FIREBASE_AUTH_DOMAIN,
  projectId: Constants.expoConfig.extra.FIREBASE_PROJECT_ID,
  storageBucket: Constants.expoConfig.extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig.extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: Constants.expoConfig.extra.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyC6OkOOJpQ8aoKonOFhNUxXJLYr_5XI6To",
//   authDomain: "next-planner-5fd59.firebaseapp.com",
//   projectId: "next-planner-5fd59",
//   storageBucket: "next-planner-5fd59.firebasestorage.app",
//   messagingSenderId: "1035697456696",
//   appId: "1:1035697456696:web:61371242063115da0d88cd",
//   measurementId: "G-BFY7NV7BX7"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);