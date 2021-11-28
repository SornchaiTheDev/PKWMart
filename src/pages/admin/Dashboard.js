import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";
import "../../App.css";

function Dashboard() {
  const cookies = new Cookies();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [salary, setSalary] = useState({});
  const [chart, setChart] = useState([]);
  const [hits, setHits] = useState([]);
  const isAdmin = cookies.get("admin");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        history.replace("/");
      }
    });
  }, []);

  useEffect(() => {
    firebase
      .firestore()
      .collection("admin")
      .doc("salary")
      .onSnapshot(
        (doc) => (setSalary(doc.data().amount), setChart(doc.data().chart))
      );

    firebase
      .firestore()
      .collection("admin")
      .doc("hits")
      .collection("items")
      .orderBy("amount", "desc")
      .limit(3)
      .onSnapshot((docs) => {
        let data = [];
        docs.forEach((doc) => data.push(doc.data()));

        setHits(data);
      });
  }, []);

  if (user === []) return <div></div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "#eee",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
          padding: "50px 20px",
          background: "white",
          width: "50%",
          flexWrap: "wrap",
          minHeight: "60vh",
        }}
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h1>ระบบจัดการหลังร้านมาร์ท</h1>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
              }}
            >
              <h3>
                ผู้ใช้ :{" "}
                {user !== null && user.email
                  ? user.email.replace(/@.+/g, "")
                  : "กำลังโหลด"}
              </h3>

              <FontAwesomeIcon
                icon={faSignOutAlt}
                color="red"
                style={{ cursor: "pointer" }}
                onClick={() => firebase.auth().signOut()}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              gap: 40,
            }}
          >
            <div style={{ marginTop: 20 }}>
              <h3>รายได้วันนี้</h3>
              <h1 style={{ fontSize: "3rem" }}>
                {salary.day === undefined
                  ? "กำลังโหลด"
                  : `${salary.day
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท`}{" "}
              </h1>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3>รายได้เดือนนี้</h3>
              <h1 style={{ fontSize: "3rem" }}>
                {salary.month === undefined
                  ? "กำลังโหลด"
                  : `${salary.month
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท`}{" "}
              </h1>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "100%", flex: 0.5, height: 300 }}>
            <VictoryChart>
              <VictoryLine
                style={{
                  data: { stroke: "#0099FF" },
                  parent: { border: "1px solid black" },
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                interpolation="linear"
                data={chart}
                x="day"
                y="amount"
              />
              <VictoryAxis label="" style={{ axisLabel: { padding: 10 } }} />
              <VictoryAxis
                label="จำนวนเงิน"
                dependentAxis
                style={{ axisLabel: { padding: 40 } }}
              />
            </VictoryChart>
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              flex: 0.4,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <h3 style={{ marginTop: 20 }}>สินค้าขายดีสุดในสัปดาห์นี้</h3>
            {hits.map(({ name, amount }) => (
              <div
                style={{
                  minWidth: "60%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  background: "#f6f6f6",
                  padding: "10px 30px",
                  borderRadius: 10,
                  gap: 10,
                }}
              >
                <h4>{name}</h4>
                <h4>{amount} ชิ้น</h4>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
            marginTop: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              background: "#bebebe",
              padding: 10,
              borderRadius: 6,
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => history.push("/admin/stock")}
          >
            <FontAwesomeIcon icon={faCartArrowDown} size="1x" />
            <h3>จัดการสต็อก</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
