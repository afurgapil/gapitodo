import firebase from "firebase/compat/app"; // firebase compat modülü
import "firebase/compat/auth"; // auth modülü

const firebaseConfig = {
  apiKey: "AIzaSyD1Ok0xbv1MgU3gRhlzv4Gg9Bl6IoMyEXI",
  authDomain: "react-todo-app-14b70.firebaseapp.com",
  databaseURL:
    "https://react-todo-app-14b70-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-todo-app-14b70",
  storageBucket: "react-todo-app-14b70.appspot.com",
  messagingSenderId: "125825857540",
  appId: "1:125825857540:web:3b6fb19766cee61edddd51",
  measurementId: "G-916JTHWS8G",
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
