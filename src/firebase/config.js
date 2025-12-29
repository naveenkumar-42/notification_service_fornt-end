// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAyRjdmwBvst_8kFn-zRGMDPyJxLaaKVgc",
    authDomain: "notification-management-5d62d.firebaseapp.com",
    projectId: "notification-management-5d62d",
    storageBucket: "notification-management-5d62d.firebasestorage.app",
    messagingSenderId: "1071017114674",
    appId: "1:1071017114674:web:45d1efec97b8fa8c6e502b",
    measurementId: "G-FWKJ2VFDNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, analytics };
