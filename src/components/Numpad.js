import React, { useState, useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";
function Numpad({ onPress, clear }) {
  const [number, setNumber] = useState([]);

  useEffect(() => {
    onPress(number);
  }, [number]);

  useEffect(() => {
    setNumber([]);
  }, [clear]);
  return (
    <div className="change-form">
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 1])}>
        1
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 2])}>
        2
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 3])}>
        3
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 4])}>
        4
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 5])}>
        5
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 6])}>
        6
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 7])}>
        7
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 8])}>
        8
      </div>
      <div className="payIn" onClick={() => setNumber((prev) => [...prev, 9])}>
        9
      </div>
      <div
        className="payIn"
        style={{ gridColumnStart: 0, gridColumnEnd: 3 }}
        onClick={() => setNumber((prev) => [...prev, 0])}
      >
        0
      </div>
      <div
        className="payIn"
        // style={{ gridColumnStart: 3, gridColumnEnd: 6 }}
        onClick={() =>
          setNumber((prev) => {
            const old = [...prev];
            old.pop();
            return [...old];
          })
        }
      >
        <FontAwesomeIcon icon={faBackspace} />
      </div>
    </div>
  );
}

export default Numpad;
