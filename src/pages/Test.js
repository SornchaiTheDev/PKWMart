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
      .limit(91)
      .get()
      .then((docs) => {
        let payin = 0;
        docs.forEach(
          (doc) =>
            // items.push(...doc.data().items),
            (payin += parseInt(doc.data().payIn))
          // console.log(new Date(doc.data().time.seconds * 1000).getDate()),
        );

        console.log(payin);
        let total = 0;

        // items.forEach(({ price }) => setMoney((prev) => [...prev, price]));
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
