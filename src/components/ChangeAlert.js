import React, { useState, useEffect } from "react";
import Numpad from "../components/Numpad";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function ChangeAlert({ counterId, open }) {
  const [change, setChange] = useState([]);
  const [show, setShow] = useState(true);
  const [time, setTime] = useState(null);

  useEffect(() => {
    setShow(open);
  }, [open]);
  const Submit = () => {
    setShow(false);
    setChange([]);

    firebase
      .firestore()
      .collection("counter")
      .doc(counterId)
      .set({ change: parseInt(change.join("")) }, { merge: true });
  };

  useEffect(() => {
    const now = new Date();
    setTimeout(() => {
      setTime(now);
    }, 1000);
  }, [time]);

  useEffect(() => {
    if (time !== null && time.getHours() === 16) {
      setShow(true);
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
                  { day: day[date], amount: doc.data().amount.day },
                ],
              },
              { merge: true }
            );
        });
    }
  }, [time]);
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        display: show ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          background: "white",
          minWidth: "50%",
          minHeight: "70%",
          padding: 20,
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <FontAwesomeIcon
          icon={faTimes}
          size="2x"
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            cursor: "pointer",
          }}
          onClick={() => setShow(false)}
        />
        <h1>กรอกเงินทอน</h1>
        <div style={{ height: "50px" }}>
          <h1>{change.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}</h1>
        </div>
        <Numpad
          onPress={(number) => setChange(number)}
          clear={show === false}
        />

        <button
          style={{
            background: "#08c318",
            border: "none",
            padding: "20px 20%",
            borderRadius: 50,
            color: "white",
            cursor: "pointer",
            boxShadow: "0px 0px 10px 2px rgba(0, 0, 0, 0.25)",
            outline: "none",
          }}
          onClick={Submit}
        >
          <h2>ตกลง</h2>
        </button>
      </div>
    </div>
  );
}

export default ChangeAlert;
