import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
import "firebase/storage"
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyB7P3dYzPZuN3ytQnP3uwE09gyP7SnIjCY",
  authDomain: "public-help-service-16f41.firebaseapp.com",
  databaseURL: "https://public-help-service-16f41-default-rtdb.firebaseio.com",
  projectId: "public-help-service-16f41",
  storageBucket: "public-help-service-16f41.appspot.com",
  messagingSenderId: "492924894175",
  appId: "1:492924894175:web:a71cd4a5ce4873c424626a"
};

firebase.initializeApp(firebaseConfig);
export default firebase;