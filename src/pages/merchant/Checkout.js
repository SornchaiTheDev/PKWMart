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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarcode,
  faQrcode,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import Print from "./Print";

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

const BillCancel = ({ show, close, bill }) => {
  const [barcode, setBarcode] = useState("");

  const GetBill = () => {
    firebase
      .firestore()
      .collection("history")
      .doc(barcode)
      .get()
      .then((doc) => {
        // console.log(doc.data());
        if (doc.data().status === "normal") {
          bill({
            item: [...doc.data().items],
            bill: barcode,
            counter: doc.data().counter,
          });
          close();
        } else {
          alert("ไม่พบบิลนี้");
        }
      })
      .catch((err) => alert("ไม่พบบิลนี้"));
  };
  return (
    <>
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
          <div
            style={{
              width: "25vw",
              minHeight: "30vh",
              background: "white",
              borderRadius: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <h1>กรอกหมายเลขบิล</h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                GetBill();
              }}
            >
              <input
                style={{
                  borderRadius: 10,
                  outline: "none",
                  border: "1px solid black",
                  padding: 10,
                }}
                type="number"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
            </form>

            <button
              style={{
                cursor: "pointer",
                outline: "none",
                background: "red",
                border: "none",
                borderRadius: 20,
                padding: "10px 40px",
                color: "white",
              }}
              onClick={() => close()}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Custom = ({ open, close, setItem }) => {
  const [value, setValue] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          width: "20%",
          minHeight: 100,
          padding: 20,
          borderRadius: 10,
          gap: 20,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (/\+/g.test(value)) {
              const exactValue = value.split("+");
              exactValue.shift();
              const price = exactValue
                .map((value) => parseInt(value))
                .reduce((total, price) => price + total, 0);
              setItem(Math.abs(price));
            } else {
              setItem(Math.abs(parseInt(value)));
            }
          }}
        >
          <input
            placeholder="ใส่จำนวนเงิน"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            style={{
              padding: 10,
              background: "white",
              outline: "none",
              border: "1px solid #0099FF",
              borderRadius: 20,
            }}
          />
        </form>

        <button
          style={{
            cursor: "pointer",
            outline: "none",
            background: "red",
            border: "none",
            borderRadius: 20,
            padding: "10px 40px",
            color: "white",
          }}
          onClick={() => close()}
        >
          ยกเลิก
        </button>
      </div>
    </div>
  );
};

const QRScanStatus = ({ open }) => {
  const [show, setShow] = useState(false);
  const url = new URL(window.location.href);
  const counter = url.searchParams.get("counter");

  useEffect(() => {
    setShow(open);
  }, [open]);

  useEffect(() => {
    const reset = () => {
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .set({ qrBill: "" }, { merge: true });
    };
    reset();
  }, [show]);
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
          <FontAwesomeIcon
            icon={faQrcode}
            size="2x"
            style={{ alignSelf: "center", cursor: "pointer" }}
          />

          <h1>รอลูกค้าแสกนผ่านแอพ</h1>
        </div>
        <button
          style={{
            cursor: "pointer",
            border: "none",
            outline: "none",
            backgroundColor: "#0099FF",
            padding: "10px 50px",
            borderRadius: 20,
            fontSize: 18,
            color: "white",
          }}
          onClick={() => setShow(false)}
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
  const [changeOpen, setChangeOpen] = useState(false);
  const [closeShop, setCloseShop] = useState(false);
  const [multiply, setMultiply] = useState(1);
  const [voidCounter, setVoidCounter] = useState("");
  const [billVoid, setBillVoid] = useState(false);
  const [VoidItem, setVoidItem] = useState([]);
  const [counter, setCounter] = useState(null);
  const [custom, setCustom] = useState(false);
  const [bill, setBill] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [checkout, setCheckout] = useState(false);
  const [qrPay, setQrPay] = useState(false);
  const [qrBill, setQRBill] = useState("");
  const history = useHistory();
  const cookies = new Cookies();

  const getChange = cookies.get("change");
  const { GlobalItem, setGlobalItem } = useContext(Context);

  useEffect(() => {
    const Fetch = async () => {
      const url = new URL(window.location.href);
      const counter = url.searchParams.get("counter");
      setCounter(counter);
      await firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .set({ qrBill: "" }, { merge: true });
    };
    Fetch();
  }, []);

  //QR Payment

  useEffect(() => {
    const getStatus = async () => {
      const response = await fetch(
        `https://asia-south1-daipay.cloudfunctions.net/QRCheck?qr=${qrBill}&token=testtoken`
      );

      const data = await response.json();

      if (data.status === "success") {
        QRPayFunc();
        await firebase
          .firestore()
          .collection("counter")
          .doc(counter)
          .set({ qrBill: "" }, { merge: true });
      }
    };
    const timeout = setTimeout(() => {
      qrPay && item.length > 0 && qrBill !== "" && getStatus();
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [countdown, qrBill]);

  useEffect(() => {
    const QRbillNumber = `${new Date().getDate()}${new Date().getMonth()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
    setQRBill(QRbillNumber);
  }, []);

  useEffect(() => {
    const QRGen = async () => {
      if (qrPay) {
        const qrCreate = await fetch(
          `https://asia-south1-daipay.cloudfunctions.net/QRGen?qr=${qrBill}&token=testtoken`
        );
        const data = await qrCreate.json();
        if (data.status === "success") {
          await firebase
            .firestore()
            .collection("counter")
            .doc(counter)
            .set({ qrBill: qrBill }, { merge: true });
        }
      }
    };
    qrPay && QRGen();
  }, [qrPay]);

  const QRPayFunc = async () => {
    setCheckout(true);
    await firebase
      .firestore()
      .collection("e-history")
      .doc(qrBill)
      .set({
        items: item,
        time: new Date(),
        status: "normal",
        price: total,
        counter: counter,
      })
      .then(() => {})
      .catch((err) => alert(`Add Failed! ${err.code}`));

    setGlobalItem({
      type: "qr",
      item: item,
      billNumber: qrBill,
      price: total,
      counter: counter,
    });

    history.replace("/merchant/print");
  };
  //QR Payment --- End

  useEffect(() => {
    const keyPress = (e) => {
      (e.code === "NumpadDivide" || e.code === "Slash" || e.code === "Space") &&
        document.getElementById("money").focus();
      if (e.code === "NumpadMultiply") {
        setMultiply("");
        document.getElementById("multiply").focus();
      }

      if (e.code === "NumpadEnter") {
        setChange(0);
        cookies.set("change", 0);
      }

      if (
        e.code === "NumpadSubtract" ||
        e.code === "Minus" ||
        e.code === "NumpadAdd"
      ) {
        setCustom(true);
      }
    };

    document.addEventListener("keydown", keyPress, false);

    return () => {
      document.removeEventListener("keydown", keyPress, false);
    };

    const show = cookies.get("show");

    setShow(show);
  }, []);

  useEffect(() => {
    setChange(getChange);
  }, [getChange]);

  useEffect(() => {
    const scroll = document.getElementById("items");
    scroll.scrollTop = scroll.scrollHeight;
  }, [item]);

  const BillDelete = async () => {
    if (bill === "") {
      setItem([]);
      setMoney([]);
      setClear(Math.random());
    } else {
      await firebase
        .firestore()
        .collection("history")
        .doc(bill)
        .update({ status: "cancel" }, { merge: true })
        .then(() => console.log("success"));

      await firebase
        .firestore()
        .collection("history")
        .doc(bill)
        .get()
        .then(async (doc) => {
          const price = doc.data().price;

          await firebase
            .firestore()
            .collection("counter")
            .doc(voidCounter)
            .update(
              { salary: firebase.firestore.FieldValue.increment(-price) },
              { merge: true }
            )
            .then(() => console.log("remove"));

          setItem([]);
          setMoney([]);
          setBill("");
        });
    }
  };

  const Payment = async () => {
    if (counter == null) return alert("err !");
    if (checkout) return;
    if (item.length === 0) return;

    const billNumber = `${new Date().getDate()}${new Date().getMonth()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;

    const payIn = typeof money === "object" ? parseInt(money.join("")) : money;

    // if (bill === "") {
    if (payIn >= total) {
      setCheckout(true);
      await firebase
        .firestore()
        .collection("history")
        .doc(billNumber)
        .set({
          payIn: payIn,
          items: item,
          time: new Date(),
          status: "normal",
          price: total,
          counter: counter,
        })
        .catch((err) => alert(`Add Failed! ${err.code}`));

      // await item.forEach(({ barId, amount, name }) => {
      //   firebase
      //     .firestore()
      //     .collection("stock")
      //     .doc(barId)
      //     .update({
      //       front_amount: firebase.firestore.FieldValue.increment(-amount),
      //     });
      //   // firebase
      //   //   .firestore()
      //   //   .collection("admin")
      //   //   .doc("hits")
      //   //   .collection("items")
      //   //   .doc(name)
      //   //   .set(
      //   //     {
      //   //       name: name,
      //   //       amount: firebase.firestore.FieldValue.increment(amount),
      //   //     },
      //   //     { merge: true }
      //   //   );
      // });

      setChange(payIn - total);

      counter !== null &&
        (await firebase
          .firestore()
          .collection("counter")
          .doc(counter)
          .update({
            change: payIn - total,
            salary: firebase.firestore.FieldValue.increment(total),
          }));

      setGlobalItem({
        item: item,
        total: payIn,
        change: payIn - total,
        billNumber: billNumber,
        price: total,
        counter: counter,
      });
      await cookies.set("change", payIn - total);

      history.replace("/merchant/print");
    }
    // } else {
    //   await firebase.firestore().collection("history").doc(bill).delete();

    //   await firebase
    //     .firestore()
    //     .collection("history")
    //     .doc(bill)
    //     .set({
    //       payIn: payIn,
    //       items: item,
    //       time: new Date(),
    //       status: "normal",
    //       price: total,
    //       counter: voidCounter,
    //     })
    //     .then(() => {})
    //     .catch((err) => alert(`Add Failed! ${err.code}`));

    //   let price = 0;
    //   for (let item of VoidItem) {
    //     await firebase
    //       .firestore()
    //       .collection("stock")
    //       .doc(item.barcode)
    //       .get()
    //       .then((doc) => (price += doc.data().price));
    //   }

    //   await firebase
    //     .firestore()
    //     .collection("counter")
    //     .doc(voidCounter)
    //     .update(
    //       { salary: firebase.firestore.FieldValue.increment(-price) },
    //       { merge: true }
    //     )
    //     .then(() => console.log("remove"));

    //   await firebase
    //     .firestore()
    //     .collection("counter")
    //     .doc(voidCounter)
    //     .update(
    //       { salary: firebase.firestore.FieldValue.increment(total) },
    //       { merge: true }
    //     )
    //     .then(() => console.log("add"));

    //   setGlobalItem({
    //     item: item,
    //     billNumber: bill,
    //     billVoid: true,
    //     total: payIn,
    //     price: total,
    //     change: payIn - total,
    //   });

    //   history.replace("/merchant/print");
    // }
  };

  useEffect(async () => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        history.replace("/");
      }
    });

    // await firebase
    //   .firestore()
    //   .collection("admin")
    //   .doc("salary")
    //   .get()
    //   .then((doc) => {
    //     const date = new Date(doc.data().last_update.seconds * 1000).getDate();
    //     const today = new Date().getDate();

    //     date !== today &&
    //       firebase
    //         .firestore()
    //         .collection("admin")
    //         .doc("salary")
    //         .update({
    //           amount: { day: 0, month: doc.data().amount.month },
    //           last_update: firebase.firestore.FieldValue.serverTimestamp(),
    //         });
    //   });
  }, []);

  useEffect(() => {
    const total = item.reduce((total, { price }) => total + price, 0);
    setTotal(total);
  }, [item]);

  // useEffect(() => {
  //   if (item.length === 0 && total !== 0) {
  //     firebase
  //       .firestore()
  //       .collection("admin")
  //       .doc("salary")
  //       .set(
  //         {
  //           amount: {
  //             day: firebase.firestore.FieldValue.increment(total),
  //             month: firebase.firestore.FieldValue.increment(total),
  //           },
  //           last_update: firebase.firestore.FieldValue.serverTimestamp(),
  //         },
  //         { merge: true }
  //       );

  //     setTotal(0);
  //   }
  // }, [item]);

  //Wait for Daipay
  useEffect(() => {
    counter !== null &&
      !changeOpen &&
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .update({ now: item }, { merge: true });
  }, [item, counter]);

  useEffect(() => {
    changeOpen &&
      counter !== null &&
      item.length === 0 &&
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .update({ change: 0 }, { merge: true });

    !changeOpen &&
      counter !== null &&
      firebase
        .firestore()
        .collection("counter")
        .doc(counter)
        .update({ change: 0 }, { merge: true });
  }, [changeOpen]);

  const Scann = async (data) => {
    let amount = 1;
    if (multiply !== null) amount = multiply;
    setMultiply(1);
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
            amount: parseInt(same.amount) + parseInt(amount),
            price:
              item_scan.data().price *
              (parseInt(same.amount) + parseInt(amount)),
            barId: data,
          },
        ]);
      } else {
        setItem((prev) => [
          ...prev,
          {
            ...item_scan.data(),
            amount: amount,
            price: item_scan.data().price * amount,
          },
        ]);
      }
    } else {
      alert("ไม่พบสินค้าชิ้นนี้");
    }
  };

  if (user === []) return <div id="items"></div>;

  return (
    <>
      <BillCancel
        show={billVoid}
        close={() => setBillVoid(false)}
        bill={(data) => (
          setItem(data.item), setBill(data.bill), setVoidCounter(data.counter)
        )}
      />
      {custom && (
        <Custom
          close={() => setCustom(false)}
          setItem={(data) => {
            setItem((prev) => [
              ...prev,
              { name: "ไม่มีบาร์โค้ด", price: parseInt(data), amount: 1 },
            ]);
            setCustom(false);
          }}
        />
      )}

      <Conclusion
        counter={counter}
        show={closeShop}
        close={() => setCloseShop(false)}
        setGlobalItem={(data) => setGlobalItem(data)}
        history={history}
      />
      <QRScanStatus open={qrPay} />
      {/* <ChangeAlert counterId="test1" open={changeOpen} /> */}
      <BarcodeScanner onScan={!billVoid && Scann} />
      <Alert
        show={change > 0}
        onClick={() => {
          setChange(0);
          cookies.set("change", 0);
        }}
        change={change}
      />
      <div className="container">
        <div className="checkout-flex">
          <div className="left-panel">
            <h1
              style={{
                marginTop: 50,
                color:
                  counter === "counter01@pkw.ac.th" ||
                  counter === "counter02@pkw.ac.th"
                    ? "black"
                    : "red",
              }}
            >
              {counter === "counter01@pkw.ac.th"
                ? "เครื่องที่  1"
                : counter === "counter02@pkw.ac.th"
                ? "เครื่องที่  2"
                : "เปิดโปรแกรมใหม่ !"}
            </h1>
            <h3 style={{ fontSize: 48 }}>รายการสินค้า {item.length} ชิ้น</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <h1>x</h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  document.getElementById("multiply").blur();
                }}
              >
                <input
                  id="multiply"
                  style={{ fontSize: 28, border: "none", width: "100px" }}
                  type="number"
                  value={multiply}
                  onChange={(e) => setMultiply(e.target.value)}
                />
              </form>
            </div>

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
                {item.map(({ name, amount, price, barcode }, index) => (
                  <Item
                    barcode={barcode}
                    key={index}
                    order={index + 1}
                    name={name}
                    id={index}
                    amount={amount}
                    price={price}
                    del={({ id, barcode, amount }) => {
                      bill !== "" &&
                        setVoidItem((prev) => [
                          ...prev,
                          { barcode: barcode, amount: amount },
                        ]);
                      setItem((prev) =>
                        prev.filter((data, index) => index !== id)
                      );
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <button
                style={{
                  marginTop: 20,
                  border: "none",
                  background: "#0099FF",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: 20,
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => setCloseShop(true)}
              >
                สรุปยอดรายวัน
              </button>

              <button
                style={{
                  marginTop: 20,
                  border: "none",
                  background: "#0099FF",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: 20,
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => setBillVoid(true)}
              >
                ยกเลิกบิล
              </button>
              <button
                style={{
                  marginTop: 20,
                  border: "none",
                  background: "#0099FF",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: 20,
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => setCustom(true)}
              >
                ขายเอง
              </button>
              <button
                style={{
                  marginTop: 20,
                  border: "none",
                  background: "#0099FF",
                  color: "white",
                  padding: "20px 40px",
                  borderRadius: 20,
                  cursor: "pointer",
                  outline: "none",
                }}
                onClick={() => setQrPay(true)}
              >
                แสกนจ่าย
              </button>
            </div>
          </div>

          <div className="right-panel">
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      Payment();
                    }}
                  >
                    <input
                      style={{
                        backgroundColor: "white",
                        borderRadius: 20,
                        border: "1px solid black",
                        outline: "none",
                        fontSize: 18,
                        padding: "10px 16px",
                      }}
                      type="number"
                      value={money}
                      id="money"
                      onChange={(e) => setMoney(e.target.value)}
                    />
                  </form>
                  {typeof money === "object"
                    ? money.join("").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : money}
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
                onClick={() => BillDelete()}
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
