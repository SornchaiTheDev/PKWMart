import firebase from  "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAHVu0llKTeO9kxjqpR9o0a99mLhgQKCQk",
    authDomain: "mart-fdeb3.firebaseapp.com",
    projectId: "mart-fdeb3",
    storageBucket: "mart-fdeb3.appspot.com",
    messagingSenderId: "390862191046",
    appId: "1:390862191046:web:c92bd906fa40ffda701ac7",
    measurementId: "G-E7FGTMGT9F"
  };

firebase.initializeApp(firebaseConfig);
export default firebase



