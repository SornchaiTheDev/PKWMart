import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../App.css";
import {
  faTrash,
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../App.css";
import firebase from "../../firebase";
import Alert from "../../components/Alert";
import Popup from "../../components/Popup";
import Items from "../../components/Stock_Item";
// firebase.firestore().useEmulator("localhost", 8080);

function Stock() {
  const cookies = new Cookies();
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [front, setFront] = useState(true);
  const [addItem, setAddItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [last, setLast] = useState(null);
  const [show, setShow] = useState(false);
  const [frontItem, setFrontItem] = useState(false);
  const [stockItem, setStockItem] = useState(false);
  const [count, setCount] = useState(0);
  const [read, setRead] = useState(0);
  const [success, setSuccess] = useState(0);

  //All Items
  const [item, setItem] = useState([]);

  //Auth Status
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
      .collection("stock")
      .orderBy("createdAt", "asc")
      .limit(5)
      .get()
      .then((docs) => {
        const data = [];
        let last;
        docs.forEach((doc) => {
          doc.id !== "count" && data.push({ ...doc.data(), id: doc.id });
          setRead((prev) => prev + 1);

          last = doc.data().createdAt;
        });
        setItem((prev) => [...data]);
        setLast(last);
        // console.log(JSON.stringify(data[0]));
      });

    firebase
      .firestore()
      .collection("stock")
      .doc("count")
      .get()
      // .onSnapshot((doc) => setCount(doc.data().amount));
      .then((doc) => setCount(doc.data().amount));
  }, [success]);

  // useEffect(() => {
  //   console.log(last)
  // },[last])
  const infiniteLoad = (e) => {
    const { window } = e.currentTarget;

    if (
      Math.round(window.innerHeight + window.scrollY) ===
        document.body.offsetHeight &&
      last !== undefined
    ) {
      setIsLoading(true);
      firebase
        .firestore()
        .collection("stock")
        .orderBy("createdAt", "asc")
        .startAfter(last)
        .limit(5)
        .get()
        .then((docs) => {
          const data = [];
          let last;
          docs.forEach((doc) => {
            if (
              doc.id === "count" &&
              item.some(({ name }) => name === doc.data().name)
            ) {
              return;
            }
            data.push({ ...doc.data(), id: doc.id });
            last = doc.data().createdAt;
          });
          setItem((prev) => [...prev, ...data]);
          setLast(last);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.code));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", infiniteLoad);
    console.log(item)
    return () => window.removeEventListener("scroll", infiniteLoad);
  }, [last]);

  if (user === []) return <div></div>;
  return (
    <>
      <Popup add={frontItem} close={() => setFrontItem(false)} />
      <Popup add={stockItem} close={() => setStockItem(false)} stock />

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
            <div
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
            </div>

            <div
              style={{
                marginTop: 50,
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 100,
              }}
            >
              <div
                onClick={() => setFront(!front)}
                style={{
                  cursor: "pointer",
                  borderBottom: front
                    ? "4px solid #0099FF"
                    : "0px solid #0099FF",
                  transition: "border-bottom 100ms",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25em",
                    color: front ? "black" : "white",
                  }}
                >
                  สินค้าหน้าร้าน
                </h3>
              </div>
              <div
                onClick={() => setFront(!front)}
                style={{
                  cursor: "pointer",
                  borderBottom: front ? "0px solid #0099FF" : "4px solid white",
                  transition: "border-bottom 100ms",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.25em",
                    color: front ? "black" : "white",
                  }}
                >
                  สินค้าในสต็อก
                </h3>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <div
                style={{
                  // width: "100px",
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
              <div
                style={{
                  width: "100px",
                  padding: 20,
                  borderRadius: 20,
                  display: !front ? "flex" : "none",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setAddItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>เพิ่มสินค้า</h4>
              </div>
              <div
                style={{
                  // width: "100px",
                  padding: 20,
                  borderRadius: 20,
                  display: !front ? "flex" : "none",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "#58EF2E",
                  cursor: "pointer",
                }}
                onClick={() => setStockItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>เติมสินค้าในสต็อก</h4>
              </div>
            </div>
            {addItem && !front && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Items
                  from="stock"
                  removeItem={() => setAddItem(false)}
                  addItem
                  success={() => setSuccess((prev) => prev + 1)}
                />
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: 20,
            }}
          >
            {item.length === 0 && <h3>ไม่มีสินค้า</h3>}
            {item
              .sort((a, b) =>
                front
                  ? b.front_item - a.front_item
                  : b.stock_item - a.stock_item
              )
              .map(
                ({ name, barcode, price, front_amount, stock_amount, id }) => (
                  <Items
                    key={id}
                    doc={id}
                    item_barcode={id}
                    item_name={name.toString()}
                    item_price={price}
                    front_amount={front_amount}
                    stock_amount={stock_amount}
                    front={front}
                    removeItem={(item_name) => (
                      setItem((prev) =>
                        prev.filter(({ name }) => name !== item_name)
                      ),
                      firebase
                        .firestore()
                        .collection("stock")
                        .doc("count")
                        .update({
                          amount: firebase.firestore.FieldValue.increment(-1),
                        }),
                      setSuccess((prev) => prev - 1)
                    )}
                  />
                )
              )}
            {isLoading && <h2>กำลังโหลด</h2>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Stock;
