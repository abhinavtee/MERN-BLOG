// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getEnv } from "./getEnv";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv("VITE_FIREBASE_API"),
  authDomain: "infobridge-blog.firebaseapp.com",
  projectId: "infobridge-blog",
  storageBucket: "infobridge-blog.firebasestorage.app",
  messagingSenderId: "682805978693",
  appId: "1:682805978693:web:44a4929f1fe5d35629252c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };