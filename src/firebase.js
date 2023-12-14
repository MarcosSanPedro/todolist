import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAwymbj2Fr8-UnP6uJN6pC7G2wr-enlEdc",
  authDomain: "getyourparkname-95944.firebaseapp.com",
  projectId: "getyourparkname-95944",
  storageBucket: "getyourparkname-95944.appspot.com",
  messagingSenderId: "402843358099",
  appId: "1:402843358099:web:75dce8111c6f9cd5898e66",
  measurementId: "G-L5BNMD0CQ6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

