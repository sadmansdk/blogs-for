import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDzPaT1g2M6WxYeOsmT_L3jKEQ2sAs3bDY",
  authDomain: "blogs-10f3f.firebaseapp.com",
  projectId: "blogs-10f3f",
  storageBucket: "blogs-10f3f.firebasestorage.app",
  messagingSenderId: "692742339",
  appId: "1:692742339:web:7b3b925acd66e689e79a76"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 