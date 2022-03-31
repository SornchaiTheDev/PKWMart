import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Popup from "../../components/Popup";
import Items from "../../components/Stock_Item";
import AddItem from "../../components/AddItem";
import EditPopup from "../../components/EditPopup";
import "../../App.css";

function Stock() {
  const history = useHistory();
  const [addItem, setAddItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stockItem, setStockItem] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [count, setCount] = useState("0");

  const { search } = useLocation();
  const counter = new URLSearchParams(search).get("counter");

  //All Items
  const [item, setItem] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_HOSTNAME}/stock`)
      .then((res) => setItem(res.data));

    axios.get(`http://${process.env.REACT_APP_HOSTNAME}/count`).then((res) => {
      const amount = res.data.amount;
      setCount(amount);
    });
  }, []);

  return (
    <>
      <Popup add={stockItem} close={() => setStockItem(false)} stock />
      {editItem && <EditPopup close={() => setEditItem(false)} />}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "#0099FF",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "50px 20px",
            background: "white",
            width: "90%",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 20,
              cursor: "pointer",
            }}
            onClick={() => history.replace(`/?counter=${counter}`)}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="1x" color="black" />
            <h4 style={{ color: "black" }}>กลับหน้าหลัก</h4>
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
                borderBottom: "6px solid #0099FF",
              }}
            >
              <h2 style={{ color: "black" }}>สินค้าทั้งหมด</h2>
              <h1 style={{ fontSize: 64, color: "black" }}>
                {count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
                ชิ้น
              </h1>
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
                  width: "100px",
                  padding: 20,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() => setAddItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>เพิ่มสินค้า</h4>
              </div>
              {/* <div
                style={{
                  padding: 20,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "black",
                  cursor: "pointer",
                }}
                onClick={() => setStockItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>เติมสินค้าในสต็อก</h4>
              </div> */}
              <div
                style={{
                  padding: 20,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  color: "gold",
                  cursor: "pointer",
                }}
                onClick={() => setEditItem(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                <h4>แก้ไขสินค้า</h4>
              </div>
            </div>
            {addItem && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AddItem removeItem={() => setAddItem(false)} />
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
              .sort((a, b) => b.stock_item - a.stock_item)
              .map(({ name, price, stock_amount, barcode }) => (
                <Items
                  key={barcode}
                  item_barcode={barcode}
                  item_name={name.toString()}
                  item_price={price}
                  stock_amount={stock_amount}
                  removeItem={(item_barcode) => {
                    setCount((prev) => prev - 1);
                    setItem((prev) =>
                      prev.filter(({ barcode }) => barcode !== item_barcode)
                    );
                  }}
                />
              ))}
            {isLoading && <h2>กำลังโหลด</h2>}
            <div style={{ height: 50, content: "" }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Stock;
