import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import firebase from "../firebase";
import QRCode from "react-qr-code";
import "../App.css";

function CustomerView() {
  const [item, setItem] = useState([]);
  const [change, setChange] = useState(0);
  const [qrBill, setQRBill] = useState("");
  const total = item.reduce((total, { price }) => total + price, 0);

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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          gap: 20,
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
            รายการสินค้า {item.length} ชิ้น
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
        </div>

        <div
          style={{
            width: "100%",
            height: "90vh",
            marginRight: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "95%",
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
              <>
                <iframe
                  src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FPKWSchoolOfficial%2Fposts%2F927637251140980&show_text=true&width=500"
                  width="350"
                  height="574"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameborder="0"
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </>
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
                    value={`660966353408${total}B102${qrBill}`}
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
              width: "100%",
              height: "30%",
              borderRadius: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.2)",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <h3 style={{ fontSize: "3rem" }}>รวมทั้งหมด</h3>
              <h3 style={{ fontSize: "3rem" }}>เงินทอน</h3>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#0099FF",
                    fontSize: "3rem",
                    marginRight: 10,
                  }}
                >
                  {item.reduce((total, { price }) => total + price, 0)}
                </span>
                <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
                  บาท
                </span>
              </div>
              <div>
                <span
                  style={{
                    color: "#0099FF",
                    fontSize: "3rem",
                    marginRight: 10,
                  }}
                >
                  {change}
                </span>{" "}
                <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
                  บาท
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerView;
