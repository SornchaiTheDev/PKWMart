import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Item from "../components/Item";
import firebase from "../firebase";
import QRCode from "react-qr-code";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";

const QRPay = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        background: "rgba(0,0,0,0.5)",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    ></div>
  );
};

function CustomerView() {
  const [item, setItem] = useState([]);
  const cookies = new Cookies();

  const total = item.reduce((total, { price }) => total + price, 0);
  const [change, setChange] = useState(0);
  const { counter } = useParams();
  useEffect(() => {
    const Fetch = async () => {
      const url = new URL(window.location.href);
      const counter = url.searchParams.get("counter");
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .onSnapshot(
          (doc) => (setItem([...doc.data().now]), setChange(doc.data().change))
        );
    };
    Fetch();
  }, []);

  return (
    <>
      {/* <QRPay /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          minHeight: "100vh",
          background: "#0099FF",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            marginLeft: 20,
            minWidth: "60%",
            background: "black",
            height: "90vh",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.2)",
            paddingLeft: "50px",
            borderRadius: "40px",
            position: "relative",
          }}
        >
          <h3 style={{ marginTop: 50, fontSize: 48 }}>
            รายการสินค้า{" "}
            {item.length}
            ชิ้น
          </h3>
          <div
            style={{
              overflowY: "scroll",
              maxHeight: 650,
              width: "90%",
              padding: 10,
            }}
            id="items"
          >
            <div className="all-items">
              {item.map(({ name, amount, price }, index) => (
                <Item
                  key={index}
                  order={index + 1}
                  name={name}
                  id={index}
                  amount={amount}
                  price={price}
                  customer
                />
              ))}
            </div>
          </div>

          {/* <div style={{ position: "absolute", bottom: 20, right: 30 }}>
            <h3 style={{ fontSize: "3rem" }}>
              รวมทั้งหมด{" "}
              <span style={{ color: "#0099FF" }}>
                {item.reduce((total, { price }) => total + price, 0)}
              </span>{" "}
              บาท
            </h3>
          </div> */}
        </div>

        <div
          style={{
            width: "100%",
            height: "90vh",
            marginRight: 20,
            //   backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              minWidth: "80%",
              minHeight: "60%",
              backgroundColor: "white",
              boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.2)",
              paddingLeft: "50px",
              borderRadius: "40px",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <iframe
              src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPKWSchoolOfficial%2Fposts%2F902029460368426&amp;width=300&amp;show_text=true&amp;height=574&amp;appId"
              width="350"
              height="574"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameborder="0"
              allowfullscreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
            {/* <QRCode value="https://google.co.th" size={300} /> */}
            {/* <h3>
              แสกนจ่ายในแอพ <span style={{ color: "#0099FF" }}>ได้เพย์</span>
            </h3> */}
          </div>
          <div
            style={{
              background: "white",
              minWidth: "90%",
              minHeight: "20%",
              borderRadius: 20,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3 style={{ fontSize: "3rem" }}>
              รวมทั้งหมด{" "}
              <span style={{ color: "#0099FF" }}>
                {item.reduce((total, { price }) => total + price, 0)}
              </span>{" "}
              บาท
            </h3>
            <h3 style={{ fontSize: "3rem" }}>
              เงินทอน
              <span style={{ color: "#0099FF" }}>{change}</span> บาท
            </h3>
          </div>
          {/* <div
          style={{
            minWidth: "80%",
            minHeight: "10%",
            backgroundColor: "white",
            boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.2)",
            paddingLeft: "50px",
            borderRadius: "40px",
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>ขอบคุณที่ใช้บริการ PKW Mart 🤞</h2>
        </div> */}
        </div>
      </div>
    </>
  );
}

export default CustomerView;
