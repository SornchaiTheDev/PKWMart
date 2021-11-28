import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Conclusion = ({ counter, show, close, setGlobalItem, history }) => {
  const [thousand, setThousand] = useState("");
  const [fivehund, setFivehund] = useState("");
  const [hundred, setHundred] = useState("");
  const [fifty, setFifty] = useState("");
  const [twenty, setTwenty] = useState("");
  const [ten, setTen] = useState("");
  const [five, setFive] = useState("");
  const [two, setTwo] = useState("");
  const [one, setOne] = useState("");

  const [order, setOrder] = useState(1);

  const [money, setMoney] = useState(0);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(null);
  const [lastOpen, setLastOpen] = useState("");
  useEffect(() => {
    setMoney(
      thousand * 1000 +
        fivehund * 500 +
        hundred * 100 +
        fifty * 50 +
        twenty * 20 +
        ten * 10 +
        five * 5 +
        two * 2 +
        one * 1
    );
  }, [thousand, fivehund, hundred, fifty, twenty, ten, five, two, one]);

  const Calculate = () => {
    firebase
      .firestore()
      .collection("counter")
      .doc(counter)
      .get()
      .then((doc) => {
        const total = doc.data().salary;
        setLastOpen(doc.data().last_open);
        setProfit(money - 5000 - total);
        setTotal(total);
        setOrder(2);
      });
  };

  const Print = async () => {
    setGlobalItem({
      conclusion: true,
      total: total + 5000,
      change: 5000,
      profit: profit,
      counter: counter,
      last_open: lastOpen,
    });
    await firebase.firestore().collection("counter").doc(counter).update({
      salary: 0,
      last_open: firebase.firestore.FieldValue.serverTimestamp(),
    });
    history.replace("/merchant/end");
  };

  if (order === 2)
    return (
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.5)",
          minWidth: "100vw",
          minHeight: "100vh",
          display: show ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 50,
            width: "500px",
            minHeight: "300px",
            gap: 20,
            padding: 20,
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="2x"
            onClick={() => setOrder(1)}
            style={{ alignSelf: "flex-start", cursor: "pointer" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 50,
              width: "500px",
              minHeight: "300px",
              gap: 20,
              padding: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <h1>เงินทั้งหมด</h1>
              <h1>เงินทอน </h1>
              <h1>เงินสุทธิ </h1>
              <h1 style={{ color: profit > 0 ? "#08c318" : "red" }}>
                {profit > 0 ? "เงินเกิน" : "เงินขาด"}
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <h1>
                {" "}
                {money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท
              </h1>
              <h1> 5,000 บาท</h1>
              <h1>
                {" "}
                {(money - 5000)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                บาท
              </h1>
              <h1 style={{ color: profit > 0 ? "#08c318" : "red" }}>
                {profit.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                <span style={{ color: "black" }}>บาท</span>
              </h1>
            </div>
          </div>
          <button
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              backgroundColor: "#0099FF",
              padding: "10px 50px",
              borderRadius: 20,
              fontSize: 22,
              color: "white",
            }}
            onClick={Print}
          >
            ปริ้นท์
          </button>
        </div>
      </div>
    );
  if (order === 1)
    return (
      <div
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.5)",
          minWidth: "100vw",
          minHeight: "100vh",
          display: show ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 50,
            width: "500px",
            minHeight: "300px",
            gap: 20,
            padding: 10,
          }}
        >
          <h1>สรุปยอดการขายวันนี้</h1>
          <h2>{money} บาท</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <label>1,000</label>
              <label>500</label>
              <label>100</label>
              <label>50</label>
              <label>20</label>
              <label>10</label>
              <label>5</label>
              <label>2</label>
              <label>1</label>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <input
                type="number"
                value={thousand}
                onChange={(e) => setThousand(e.target.value)}
              />
              <input
                type="number"
                value={fivehund}
                onChange={(e) => setFivehund(e.target.value)}
              />
              <input
                type="number"
                value={hundred}
                onChange={(e) => setHundred(e.target.value)}
              />
              <input
                type="number"
                value={fifty}
                onChange={(e) => setFifty(e.target.value)}
              />
              <input
                type="number"
                value={twenty}
                onChange={(e) => setTwenty(e.target.value)}
              />
              <input
                type="number"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
              />
              <input
                type="number"
                value={five}
                onChange={(e) => setFive(e.target.value)}
              />
              <input
                type="number"
                value={two}
                onChange={(e) => setTwo(e.target.value)}
              />
              <input
                type="number"
                value={one}
                onChange={(e) => setOne(e.target.value)}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              gap: 20,
            }}
          >
            <button
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "#0099FF",
                padding: "10px 50px",
                borderRadius: 20,
                fontSize: 22,
                color: "white",
              }}
              onClick={Calculate}
            >
              ตกลง
            </button>
            <button
              style={{
                cursor: "pointer",
                border: "none",
                outline: "none",
                backgroundColor: "red",
                padding: "10px 50px",
                borderRadius: 20,
                fontSize: 22,
                color: "white",
              }}
              onClick={close}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    );
};

export default Conclusion;
