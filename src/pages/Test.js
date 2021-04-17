import React, { useEffect } from "react";
import firebase from "../firebase";
function Test() {
  useEffect(() => {
    const fn = () => {
      firebase
        .firestore()
        .collection("admin")
        .doc("salary")
        .get()
        .then((doc) => {
          const date = new Date().getDay() - 1;
          const day = ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์"];
          const chart = [...doc.data().chart];
          chart.filter((value, index) => index !== date);
          firebase
            .firestore()
            .collection("admin")
            .doc("salary")
            .set(
              {
                chart: [
                  ...chart.filter((value, index) => index !== date),
                  { day: day[date], amount: 0 },
                ],
              },
              { merge: true }
            );
        });
    };
    fn();
  }, []);
  return <div></div>;
}

export default Test;
