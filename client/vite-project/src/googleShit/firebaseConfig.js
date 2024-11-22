
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDyu03zdsZw__zJYV06cqFJNdF_IAMR4HY",
  authDomain: "shannasecondchancestore.firebaseapp.com",
  projectId: "shannasecondchancestore",
  storageBucket: "shannasecondchancestore.firebasestorage.app",
  messagingSenderId: "790107457964",
  appId: "1:790107457964:web:968b36a6fb9d71edc49209",
  measurementId: "G-LB3TWKBKLL"
};


const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export { auth, provider, signInWithPopup };