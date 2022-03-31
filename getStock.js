const fs = require("fs");
const firebase = require("firebase").default;
const os = require("os");
const allItems = [];

const firebaseConfig = {
  apiKey: "AIzaSyAHVu0llKTeO9kxjqpR9o0a99mLhgQKCQk",
  authDomain: "mart-fdeb3.firebaseapp.com",
  projectId: "mart-fdeb3",
  storageBucket: "mart-fdeb3.appspot.com",
  messagingSenderId: "390862191046",
  appId: "1:390862191046:web:c92bd906fa40ffda701ac7",
  measurementId: "G-E7FGTMGT9F",
};

firebase.initializeApp(firebaseConfig);
firebase
  .firestore()
  .collection("stock")
  .get()
  .then((docs) => {
    docs.forEach((doc) => {
      const { barcode, name, price } = doc.data();
      allItems.push({ barcode, name, price });
    });
  })
  .then(() => {
    allItems.map((doc) =>
      fs.appendFileSync("firestore.json", JSON.stringify(doc) + "\n")
    );
  });
