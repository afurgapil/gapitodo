import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASEAPIKEY,
  authDomain: process.env.REACT_APP_FIREBASEAUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASEDATABASEURL,
  projectId: process.env.REACT_APP_FIREBASEPROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASEMESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASEAPPID,
  measurementId: process.env.REACT_APPFIREBASEMEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
