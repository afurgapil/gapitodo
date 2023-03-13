import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD1Ok0xbv1MgU3gRhlzv4Gg9Bl6IoMyEXI",
  authDomain: "react-todo-app-14b70.firebaseapp.com",
  projectId: "react-todo-app-14b70",
  storageBucket: "react-todo-app-14b70.appspot.com",
  messagingSenderId: "125825857540",
  appId: "1:125825857540:web:3b6fb19766cee61edddd51",
  measurementId: "G-916JTHWS8G",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
