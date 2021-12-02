import React, { useState, useEffect } from "react";
import Items from "./Stock_Item";
import firebase from "../firebase";

function GetItems({ front }) {
  //All Items
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [last, setLast] = useState(null);
  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(0);

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

          last = doc.data().createdAt;
        });
        setItem(() => [...data]);
        setLast(last);
      });

    firebase
      .firestore()
      .collection("stock")
      .doc("count")
      .get()
      .then((doc) => setCount(doc.data().amount));
  }, [success]);

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
    console.log(item);
    return () => window.removeEventListener("scroll", infiniteLoad);
  }, [last]);
  return (
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
          front ? b.front_item - a.front_item : b.stock_item - a.stock_item
        )
        .map(({ name, price, front_amount, stock_amount, id }) => (
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
              setItem((prev) => prev.filter(({ name }) => name !== item_name)),
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
        ))}
      {isLoading && <h2>กำลังโหลด</h2>}
    </div>
  );
}

export default GetItems;
