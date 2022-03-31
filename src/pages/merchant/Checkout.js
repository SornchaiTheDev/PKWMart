import React, { useState, useEffect, useContext } from "react";
import Item from "../../components/Item";
import { useHistory } from "react-router-dom";
import { Context } from "../../App";
import Cookies from "universal-cookie";
import Alert from "../../components/Alert";
import Conclusion from "../../components/Conclusion";
import BarcodeScanner from "react-barcode-reader";
import BillCancel from "../../components/BillCancel";
import Custom from "../../components/Custom";
import axios from "axios";
import "../../App.css";

function Checkout() {
  const cookies = new Cookies();

  // Checkout Essentail
  const [multiply, setMultiply] = useState(1);
  const [voidCounter, setVoidCounter] = useState("");
  const [counter, setCounter] = useState(null);
  const [bill, setBill] = useState("");
  const [item, setItem] = useState([]);
  const [money, setMoney] = useState("");
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(cookies.get("change"));

  // PopUp Status
  const [checkout, setCheckout] = useState(false);
  const [custom, setCustom] = useState(false);
  const [closeShop, setCloseShop] = useState(false);
  const [billVoid, setBillVoid] = useState(false);

  const history = useHistory();

  const { setGlobalItem } = useContext(Context);

  useEffect(() => {
    const url = new URL(window.location.href);
    const counter = url.searchParams.get("counter");
    setCounter(counter);
  }, []);

  const Payment = async () => {
    if (counter == null) return alert("err !");
    if (checkout) return;
    if (item.length === 0) return;

    const billNumber = `${new Date().getDate()}${new Date().getMonth()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;

    const payIn = typeof money === "object" ? parseInt(money.join("")) : money;

    if (payIn >= total) {
      setCheckout(true);

      setChange(payIn - total);

      axios.post(`http://${process.env.REACT_APP_HOSTNAME}/counter/update`, {
        counter: Number(counter),
        total,
        billNumber,
        payIn: payIn,
        items: item,
        time: new Date(),
        price: total,
        status: "pay",
      });

      setGlobalItem({
        item: item,
        total: payIn,
        change: payIn - total,
        billNumber: billNumber,
        price: total,
        counter: counter,
      });
      await cookies.set("change", payIn - total);

      history.push(`/merchant/print?counter=${counter}`);
    }
  };

  const BillDelete = async () => {
    if (bill !== "") {
      const res = await axios.get(
        `http://${process.env.REACT_APP_HOSTNAME}/bill/${bill}`
      );

      const price = res.data.price;

      await axios.post(
        `http://${process.env.REACT_APP_HOSTNAME}/counter/update`,
        {
          counter: voidCounter,
          total: -price,
          status: "void",
        }
      );

      await axios.post(`http://${process.env.REACT_APP_HOSTNAME}/bill/cancel`, {
        billNumber: bill,
      });
    }

    setItem([]);
    setMoney("");
    setBill("");
  };
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
  }, []);

  useEffect(() => {
    const scroll = document.getElementById("items");
    scroll.scrollTop = scroll.scrollHeight;
  }, [item]);

  // Update Total Price
  useEffect(() => {
    const total = item.reduce((total, { price }) => total + price, 0);
    setTotal(total);
  }, [item]);

  // Scan Barcode To Add Item
  const Scann = async (data) => {
    let amount = 1;
    if (multiply !== null) amount = multiply;
    setMultiply(1);
    console.log("scann");
    const item_scan = await axios.get(
      `http://${process.env.REACT_APP_HOSTNAME}/stock/${data}`
    );

    if (item_scan) {
      const same = item.find(({ name }) => name === item_scan.data.name);
      if (same) {
        const new_list = item.filter(
          ({ name }) => name !== item_scan.data.name
        );
        setItem(() => [
          ...new_list,
          {
            ...item_scan.data,
            amount: parseInt(same.amount) + parseInt(amount),
            price:
              item_scan.data.price * (parseInt(same.amount) + parseInt(amount)),
            barId: data,
          },
        ]);
      } else {
        setItem((prev) => [
          ...prev,
          {
            ...item_scan.data,
            amount: amount,
            price: item_scan.data.price * amount,
          },
        ]);
      }
    } else {
      alert("ไม่พบสินค้าชิ้นนี้");
    }
  };

  return (
    <>
      <BillCancel
        show={billVoid}
        close={() => setBillVoid(false)}
        bill={(data) => (
          setItem(data.item), setBill(data.bill), setVoidCounter(data.counter)
        )}
        cancel={BillDelete}
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
      <BarcodeScanner onScan={(e) => !billVoid && Scann(e)} />
      <Alert
        show={change > 0}
        onClick={() => {
          setChange(0);
          cookies.set("change", 0);
        }}
        change={change}
      />
      <div
        style={{ position: "absolute", top: 10, left: 60, cursor: "pointer" }}
        onClick={() => history.replace(`/?counter=${counter}`)}
      >
        <h3>กลับหน้าหลัก</h3>
      </div>
      <div className="container">
        <div className="checkout-flex">
          <div className="left-panel">
            <h1
              style={{
                marginTop: 50,
                color: counter === "1" || counter === "2" ? "black" : "red",
              }}
            >
              {counter === "1"
                ? "เครื่องที่  1"
                : counter === "2"
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
                    id="money"
                    onChange={(e) => setMoney(e.target.value.replace(/,/g, ""))}
                  />
                </form>
              </div>
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
