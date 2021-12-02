import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import firebase from "../../firebase";
import Popup from "../../components/Popup";
import GetItems from "../../components/GetItems";
import StockMenu from "../../components/StockMenu";
import "../../App.css";

function Front() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [front, setFront] = useState(true);
  const [addItem, setAddItem] = useState(false);

  const [frontItem, setFrontItem] = useState(false);
  const [stockItem, setStockItem] = useState(false);
  const [editItem, setEditItem] = useState(false);



  //Auth Status
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        history.replace("/");
      }
    });
  }, []);

  if (user === []) return <div></div>;
  return (
    <>
      <Popup add={frontItem} close={() => setFrontItem(false)} />
      <Popup add={stockItem} close={() => setStockItem(false)} stock />
      {/* <Popup add={addItem} close={() => setAddItem(true)} stock /> */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: front ? "#0099FF" : "white",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "50px 20px",
            background: front ? "white" : "#0099FF",
            width: "90%",
            flexWrap: "wrap",
          }}
        >
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 20,
                cursor: "pointer",
              }}
              onClick={() => history.replace("/admin/dashboard")}
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                size="1x"
                color={front ? "black" : "white"}
              />
              <h4 style={{ color: front ? "black" : "white" }}>กลับหน้าหลัก</h4>
            </div>
            {/* <div
              style={{
                display: "flex",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap",
                gap: 100,
              }}
            >
              <div
                style={{
                  marginTop: 20,
                  borderBottom: front ? "6px solid #0099FF" : "6px solid white",
                }}
              >
                <h2 style={{ color: front ? "black" : "white" }}>
                  สินค้าทั้งหมด
                </h2>
                <h1 style={{ fontSize: 64, color: front ? "black" : "white" }}>
                  {count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                  ชิ้น
                </h1>
              </div>
            </div> */}
            <StockMenu front />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <div
                style={{
                  padding: 20,
                  borderRadius: 20,
                  display: front ? "flex" : "none",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() => setFrontItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>เติมสินค้าหน้าร้าน</h4>
              </div>
            </div>
          </div>
          <GetItems />
        </div>
      </div>
    </>
  );
}

export default Front;
