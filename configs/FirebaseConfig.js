import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2wxGk27C_lINury-YLY_sb2_UetOPSac",
  authDomain: "business-directory-9144.firebaseapp.com",
  projectId: "business-directory-9144",
  storageBucket: "business-directory-9144.appspot.com",
  messagingSenderId: "611734731995",
  appId: "1:611734731995:web:a151d034e00b65d749a0fe"
  // Removed measurementId
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);
// No Analytics related code
