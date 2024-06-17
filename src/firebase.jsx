// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPaOmB_LwjAcRUnRsdToTiJn6L3ZHp68s",
  authDomain: "borrow-system--react-auth.firebaseapp.com",
  projectId: "borrow-system--react-auth",
  storageBucket: "borrow-system--react-auth.appspot.com",
  messagingSenderId: "367722899394",
  appId: "1:367722899394:web:499978321147263899185b",
  measurementId: "G-2BNRQLDHTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
