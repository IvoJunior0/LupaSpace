import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKB2Z3yMpOX2x_ZiA1fAmNoCHPlhw-_mQ",
  authDomain: "lupaspace-8be83.firebaseapp.com",
  projectId: "lupaspace-8be83",
  storageBucket: "lupaspace-8be83.appspot.com",
  messagingSenderId: "927648713693",
  appId: "1:927648713693:web:616d16171443a14871c434",
  measurementId: "G-F8FC7J72BV"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();