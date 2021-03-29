import React, { useContext } from "react";

import { Context } from "../App";

function Pay() {
  const { payItem } = useContext(Context);
  return <div>
      Pay
  </div>;
}

export default Pay;
