import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-qxH1zJBju8U0rVd7Jiei-flF1t_vt-w",
  authDomain: "roscotask-52924.firebaseapp.com",
  projectId: "roscotask-52924",
  storageBucket: "roscotask-52924.firebasestorage.app",
  messagingSenderId: "1036594803497",
  appId: "1:1036594803497:web:95141314da70e3085a3d38"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

export { app, auth, facebookProvider };
