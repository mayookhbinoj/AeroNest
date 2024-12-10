
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCe_i8kjWPcJeNQdzIO0qiXrwxUBbWmBnM",
  authDomain: "mern-e5291.firebaseapp.com",
  projectId: "mern-e5291",
  storageBucket: "mern-e5291.firebasestorage.app",
  messagingSenderId: "122224221560",
  appId: "1:122224221560:web:5272f1fef6ab3b28083c8d"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const gooogleprovider=new GoogleAuthProvider()
