import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB9TL-zS_oQ75GyqHg-GP_jsacx-L3b6c",
  authDomain: "weiinterview-1de2c.firebaseapp.com",
  projectId: "weiinterview-1de2c",
  storageBucket: "weiinterview-1de2c.appspot.com",
  messagingSenderId: "56796396056",
  appId: "1:56796396056:web:cca54274bdccfe780b216d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
