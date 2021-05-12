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
  const [qrBill, setQRBill] = useState("");
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
          (doc) => (
            setItem([...doc.data().now]),
            setChange(doc.data().change, setQRBill(doc.data().qrBill))
          )
        );
    };
    Fetch();
  }, []);

  //variable
  const time = new Date().getTime();
  const price = 100;
  const fcmToken =
    "fABPHAW3XUG7vNn4KWRW97:APA91bFGbG4mExN8AXP7WUtlK4RvfqPG81tVEGWCOIkaLgtZlh4akkF8w8D98ivyI9qNnUMoyMRMYANqQYYNXQSlyxOB6ID9K6exySOhAD03ZsgJa3NKoyoWsnFTM6QtPMqChEexPUr6";

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
            รายการสินค้า {item.length}
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
              borderRadius: "20px",
              padding: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {qrBill === "" ? (
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
            ) : (
              <>
                <h1>แสกนจ่ายตรงนี้เลย !</h1>
                <div
                  style={{
                    background: "white",
                    boxShadow: "0px 6px 1.5px 1px rgba(0,0,0,0.25)",
                    padding: 20,
                    borderRadius: 20,
                  }}
                >
                  <QRCode
                    bgColor="transparent"
                    value={`660966353408:${total}:102:${qrBill}:${fcmToken}`}
                    size={300}
                  />
                </div>
                <h3>
                  แสกนจ่ายในแอพ{" "}
                  <span style={{ color: "#0099FF" }}>ได้เพย์</span>
                </h3>
              </>
            )}
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
