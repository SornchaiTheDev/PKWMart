import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import Item from "../components/Item";
import { useHistory } from "react-router-dom";
import { Context } from "../App";
import firebase from "../firebase";

const Alert = ({ show, onClick, change, msg }) => {
  return (
    <div
      style={{
        position: "absolute",
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

  const history = useHistory();
  const { setPayItem } = useContext(Context);
  const total = item.reduce((total, { price }) => total + price, 0);

  useEffect(() => {
    const scroll = document.getElementById("items");
    scroll.scrollTop = scroll.scrollHeight;
  }, [item]);

  const Payment = () => {
    if (money >= total) {
      firebase
        .firestore()
        .collection("history")
        .add({ money: money, items: item, time: new Date() })
        .then(() => alert("Added!"))
        .catch((err) => alert(`Add Failed! ${err.code}`));
      setChange(money - total);
      setShow(true);
    } else {
      alert("จำนวนเงินไม่พอจ่าย");
    }
  };

  const AddAmount = (tag) => {
    const old = money
      .filter((data) => data.tag === tag)
      .reduce((count, data) => count + data.amount, 0);
    const all = money.filter((data) => data.tag !== tag);
    setMoney([...all, { tag: tag, amount: old + 1 }]);
  };
  //   useEffect(() => {
  //     // setTimeout(() => {
  //     //     const one = money
  //     //     .filter((data) => data.tag === "one")
  //     //     .reduce((count, data) => count + data.amount, 0);
  //     //   const not_one = money.filter((data) => data.tag !== "one");
  //     //   console.log(one);
  //     //   setMoney([...not_one, { tag: "one", amount: one + 1 }]);
  //     // }, 1000);
  //     window.addEventListener("keypress", (press) => {
  //       if (press.key === "q") {
  //         const old = money
  //           .filter((data) => data.tag === "one")
  //           .reduce((count, data) => count + data.amount, 0);
  //         const all = money.filter((data) => data.tag !== "one");
  //         setMoney([...all, { tag: "one", amount: old + 1 }]);
  //       }
  //       if (press.key === "w") {
  //         const old = money
  //           .filter((data) => data.tag === "five")
  //           .reduce((count, data) => count + data.amount, 0);
  //         const all = money.filter((data) => data.tag !== "five");
  //         setMoney([...all, { tag: "five", amount: old + 1 }]);
  //       }
  //       if (press.key === "e") {
  //         const old = money
  //           .filter((data) => data.tag === "ten")
  //           .reduce((count, data) => count + data.amount, 0);
  //         const all = money.filter((data) => data.tag !== "ten");
  //         setMoney([...all, { tag: "ten", amount: old + 1 }]);
  //       }
  //       if (press.key === "r") {
  //         const old = money
  //           .filter((data) => data.tag === "fifty")
  //           .reduce((count, data) => count + data.amount, 0);
  //         const all = money.filter((data) => data.tag !== "fifty");
  //         setMoney([...all, { tag: "fifty", amount: old + 1 }]);
  //       }
  //       if (press.key === "t") {
  //         const old = money
  //           .filter((data) => data.tag === "hundred")
  //           .reduce((count, data) => count + data.amount, 0);
  //         const all = money.filter((data) => data.tag !== "hundred");
  //         setMoney([...all, { tag: "hundred", amount: old + 1 }]);
  //       }
  //       if (press.key === "y") {

  //       }
  //     //   if (press.key === "u") {
  //     //     const old = money
  //     //       .filter((data) => data.tag === "thoudsand")
  //     //       .reduce((count, data) => count + data.amount, 0);
  //     //     const all = money.filter((data) => data.tag !== "thoudsand");
  //     //     setMoney([...all, { tag: "thoudsand", amount: old + 1000 }]);
  //     //   }
  //     });
  //   }, [money]);

  return (
    <>
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
                height: 700,
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
          </div>
          <div className="right-panel">
            <button
              onClick={() =>
                setItem((prev) => [
                  ...prev,
                  { name: "น้ำเปล่า", amount: 1, price: 5 },
                ])
              }
            >
              add
            </button>

            {/* <h3 style={{color : "red"}}>จำนวนเงินน้อยกว่าราคาสินค้า</h3> */}
            <div style={{ marginTop: 50, padding: 10 }}>
              <h1 style={{ fontSize: 24 }}>รวมทั้งหมด </h1>
              <h1 style={{}} className="BigText">
                {total} บาท
              </h1>
              <h1 style={{ fontSize: 24, marginBottom: 20 }}>รับเงินมา</h1>
              {/* <p>{JSON.stringify(money)}</p> */}
              <p>
                {money.reduce(
                  (total, data) => data.amount * parseInt(data.tag) + total,
                  0
                )}
              </p>

              <button
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "gold",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("1")}
              >
                1 บาท
              </button>
              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("2")}
              >
                2บาท
              </button>
              <button
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "purple",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("5")}
              >
                5 บาท
              </button>
              <button
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "pink",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("10")}
              >
                10 บาท
              </button>

              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("20")}
              >
                20 บาท
              </button>
              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("50")}
              >
                50 บาท
              </button>
              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("100")}
              >
                100 บาท
              </button>
              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("500")}
              >
                500 บาท
              </button>
              <button
                style={{
                  width: 100,
                  height: 50,
                  backgroundColor: "pink",
                  //   borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => AddAmount("1000")}
              >
                1000 บาท
              </button>
              {/* <input
                type="number"
                placeholder="ใส่จำนวนเงิน"
                value={money}
                onChange={(e) => setMoney(e.target.value)}
                style={{ border: "none", outline: "none", fontSize: 36 }}
              /> */}
            </div>

            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 50,
              }}
            >
              <div className="payment" onClick={() => Payment()}>
                <h2>ทอนเงิน</h2>
              </div>
              {/* <div className="payment" style={{ backgroundColor: "red" }} onClick={() => setItem([])}>
              <h2>ยกเลิก</h2>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
