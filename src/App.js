import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Checkout from "./pages/merchant/Checkout";
import Print from "./pages/merchant/Print";
import End from "./pages/merchant/End";
import Barcode from "./pages/merchant/Barcode";
import NotFound from "./pages/Notfound";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Front from "./pages/admin/Front";
import Stock from "./pages/admin/Stock";
import CustomerView from "./pages/CustomerView";

export const Context = createContext();
function App() {
  const [GlobalItem, setGlobalItem] = useState([]);

  return (
    <Context.Provider value={{ GlobalItem, setGlobalItem }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Admin} />
          <Route path="/merchant/checkout" exact component={Checkout} />
          <Route path="/merchant/print" exact component={Print} />
          <Route path="/merchant/end" exact component={End} />
          <Route path="/merchant/customer" exact component={CustomerView} />
          <Route path="/merchant/barcode" exact component={Barcode} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/admin/dashboard" exact component={Dashboard} />
          <Route path="/admin/front" exact component={Front} />
          <Route path="/admin/stock" exact component={Stock} />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
