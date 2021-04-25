import React, { useState, useEffect } from "react";
import firebase from "../firebase";
function Test() {
  const [money, setMoney] = useState([]);
  const [bill, setBill] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("history")
      .orderBy("time", "desc")
      .limit(84)
      .get()
      .then((docs) => {
        const items = [];
        docs.forEach((doc) => {
          items.push(doc.data());

          console.log(new Date(doc.data().time.seconds * 1000).getDate());
        });
        
        let total = 0;
        
        items
        .filter(({ status }) => status !== "cancel")
        .forEach(({ price }) => (total += price));
        
        console.log(items.filter(({ status }) => status !== "cancel").length)
        console.log(total);
        // setMoney((prev) => [...prev, total])
      });
    // const fn = () => {
    //   firebase
    //     .firestore()
    //     .collection("admin")
    //     .doc("salary")
    //     .get()
    //     .then((doc) => {
    //       const date = new Date().getDay() - 1;
    //       const day = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์"];
    //       const chart = [...doc.data().chart];
    //       chart.filter((value, index) => index !== date);
    //       firebase
    //         .firestore()
    //         .collection("admin")
    //         .doc("salary")
    //         .set(
    //           {
    //             chart: [
    //               ...chart.filter((value, index) => index !== date),
    //               { day: day[date], amount: 0 },
    //             ],
    //           },
    //           { merge: true }
    //         );
    //     });
    // };
    // fn();
  }, []);
  return (
    <div>
      {/* <div
          style={{
            display: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {bill.map((bill) => (
            <h1>{bill} : </h1>
          ))}
        </div> */}
    </div>
  );
}

export default Test;
