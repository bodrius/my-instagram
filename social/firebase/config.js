import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAOujn9x1GMontQ-GA3p7M4uKug9OsKnHU",
  authDomain: "my-first-app-7da6e.firebaseapp.com",
  databaseURL: "https://my-first-app-7da6e.firebaseio.com",
  projectId: "my-first-app-7da6e",
  storageBucket: "my-first-app-7da6e.appspot.com",
  messagingSenderId: "386136680556",
  appId: "1:386136680556:web:dadb2b60d7763b74e41049",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
