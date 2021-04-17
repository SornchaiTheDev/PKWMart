import React, { useState, useEffect, useContext } from "react";
import "../../App.css";
import Item from "../../components/Item";
import { useHistory } from "react-router-dom";
import { Context } from "../../App";
import firebase from "../../firebase";
import Cookies from "universal-cookie";

import BarcodeScanner from "react-barcode-reader";
import ChangeAlert from "../../components/ChangeAlert";
import Numpad from "../../components/Numpad";

const Alert = ({ show, onClick, change, msg }) => {
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
          height: "300px",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{}}>เงินทอน</h1>
          <h1 className="MediumText">
            <span style={{ color: "#0099FF" }}>{change}</span> บาท
          </h1>
        </div>
        <button
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            backgroundColor: "#0099FF",
            padding: "10px 100px",
            borderRadius: 20,
            fontSize: 28,
            color: "white",
          }}
          onClick={() => onClick()}
        >
          ปิด
        </button>
      </div>
    </div>
  );
};

function Checkout() {
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [money, setMoney] = useState([]);
  const [change, setChange] = useState(0);
  const [user, setUser] = useState([]);
  const [clear, setClear] = useState(0);
  const [total, setTotal] = useState(0);
  const [changeOpen,setChangeOpen] = useState(false)
  const history = useHistory();
  const cookies = new Cookies();
  const { GlobalItem, setGlobalItem } = useContext(Context);

  useEffect(() => {
    const scroll = document.getElementById("items");
    scroll.scrollTop = scroll.scrollHeight;
  }, [item]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  const Payment = async () => {
    const payIn = parseInt(money.join(""));
    if (payIn >= total) {
      await firebase
        .firestore()
        .collection("history")
        .add({ payIn: payIn, items: item, time: new Date() })
        .then(() => {})
        .catch((err) => alert(`Add Failed! ${err.code}`));

      await item.forEach(({ barId, amount, name }) => {
        firebase
          .firestore()
          .collection("stock")
          .doc(barId)
          .update({
            front_amount: firebase.firestore.FieldValue.increment(-amount),
          });
        firebase
          .firestore()
          .collection("admin")
          .doc("hits")
          .collection("items")
          .doc(name)
          .set(
            {
              name: name,
              amount: firebase.firestore.FieldValue.increment(amount),
            },
            { merge: true }
          );
      });

      setChange(payIn - total);
      setShow(true);
      setItem([]);
      setMoney([]);
      setClear(Math.random());
    } else {
      alert("จำนวนเงินไม่พอจ่าย");
    }
  };

  // const AddAmount = (tag) => {
  //   const old = money
  //     .filter((data) => data.tag === tag)
  //     .reduce((count, data) => count + data.amount, 0);
  //   const all = money.filter((data) => data.tag !== tag);
  //   setMoney([...all, { tag: tag, amount: old + 1 }]);
  // };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        history.replace("/");
      }
    });

    firebase
      .firestore()
      .collection("admin")
      .doc("salary")
      .get()
      .then((doc) => {
        const date = new Date(doc.data().last_update.seconds * 1000).getDate();
        const today = new Date().getDate();

        date !== today &&
          firebase
            .firestore()
            .collection("admin")
            .doc("salary")
            .update({
              amount: { day: 0, month: doc.data().amount.month },
              last_update: firebase.firestore.FieldValue.serverTimestamp(),
            });
      });
  }, []);

  useEffect(() => {
    const total = item.reduce((total, { price }) => total + price, 0);
    setTotal(total);
  }, [item]);

  useEffect(() => {
    if (item.length === 0 && total !== 0) {
      firebase
        .firestore()
        .collection("admin")
        .doc("salary")
        .set(
          {
            amount: {
              day: firebase.firestore.FieldValue.increment(total),
              month: firebase.firestore.FieldValue.increment(total),
            },
            last_update: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      setTotal(0);
    }
  }, [item]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("counter")
      .doc("test1")
      .set({ now: item }, { merge: true });
  }, [item]);

  if (user === []) return <div id="items"></div>;

  const Scann = async (data) => {
    const item_scan = await firebase
      .firestore()
      .collection("stock")
      .doc(data)
      .get();
    if (item_scan.exists) {
      const same = item.find(({ name }) => name === item_scan.data().name);
      if (same) {
        const new_list = item.filter(
          ({ name }) => name !== item_scan.data().name
        );
        setItem(() => [
          ...new_list,
          {
            ...item_scan.data(),
            amount: same.amount + 1,
            price: item_scan.data().price * (same.amount + 1),
            barId: data,
          },
        ]);
      } else {
        setItem((prev) => [...prev, { ...item_scan.data(), amount: 1 }]);
      }
    } else {
      alert("ไม่พบสินค้าชิ้นนี้");
    }
  };

  return (
    <>
      <ChangeAlert counterId="test1" open={changeOpen} />
      <BarcodeScanner onScan={Scann} />
      <Alert show={show} onClick={() => setShow(false)} change={change} />
      <div className="container" style={{ background: "#0099FF" }}>
        <div className="checkout-flex">
          <div className="left-panel">
            <h3 style={{ marginTop: 50, fontSize: 48 }}>
              รายการสินค้า {item.length} ชิ้น
            </h3>
            <div
              style={{
                overflowY: "scroll",
                height: 500,
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
                    del={(id) =>
                      setItem((prev) =>
                        prev.filter((data, index) => index !== id)
                      )
                    }
                  />
                ))}
              </div>
            </div>
            <div>
              <button
                style={{
                  marginTop : 20,
                  border: "none",
                  background: "#0099FF",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: 20,
                  cursor : "pointer",
                  outline : 'none'
                }}
                onClick={() => setChangeOpen(Math.random())}
              >
                เงินทอน
              </button>
            </div>
          </div>
          <div className="right-panel">
            {/* <button
              onClick={() =>
                setItem((prev) => [
                  ...prev,
                  { name: "น้ำเปล่า", amount: 1, price: 5 },
                ])
              }
            >
              add
            </button> */}

            {/* <h3 style={{color : "red"}}>จำนวนเงินน้อยกว่าราคาสินค้า</h3> */}
            <div
              style={{
                marginTop: 20,
                padding: 10,
                maxWidth: "90%",
              }}
            >
              <h1 style={{ fontSize: 24 }}>รวมทั้งหมด </h1>
              <h1 style={{}} className="BigText">
                {total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} บาท
              </h1>
              <h1 style={{ fontSize: 24 }}>รับเงินมา</h1>
              {/* <p>{JSON.stringify(money)}</p> */}
              <div
                style={{
                  maxWidth: "100%",
                  height: "120px",
                  maxHeight: "150px",
                  marginBottom: "20%",
                  wordWrap: "break-word",
                }}
              >
                <h1
                  style={{
                    fontSize: "48px",
                  }}
                >
                  {money.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
                  {money.length > 0 && "บาท"}
                </h1>
              </div>

              <Numpad onPress={(number) => setMoney(number)} clear={clear} />
            </div>

            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                className="payment"
                onClick={() => item.length > 0 && Payment()}
              >
                <h2>ทอนเงิน</h2>
              </div>
              <div
                className="payment"
                style={{ backgroundColor: "red" }}
                onClick={() => (
                  setItem([]), setMoney([]), setClear(Math.random())
                )}
              >
                <h2>ยกเลิก</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
