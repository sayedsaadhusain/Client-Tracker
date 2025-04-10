
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAV_7Tul7PD2SHP2LCwionsyhs8-zQL2hQ",
  authDomain: "client-hunting-tracker.firebaseapp.com",
  projectId: "client-hunting-tracker",
  storageBucket: "client-hunting-tracker.firebasestorage.app",
  messagingSenderId: "289634404089",
  appId: "1:289634404089:web:fc10907d9fd97773ed4428",
  measurementId: "G-NQR4YPTSLY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);

export default app;
