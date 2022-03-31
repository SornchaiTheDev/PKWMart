import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Checkout from "./pages/merchant/Checkout";
import Print from "./pages/merchant/Print";
import End from "./pages/merchant/End";
import NotFound from "./pages/Notfound";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Stock from "./pages/admin/Stock";
import { Redirect } from "react-router-dom";

export const Context = createContext();
function App() {
  const [GlobalItem, setGlobalItem] = useState([]);

  return (
    <Context.Provider value={{ GlobalItem, setGlobalItem }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/admin/stock" exact component={Stock} />
          <Route path="/merchant/checkout" exact component={Checkout} />
          <Route path="/merchant/print" exact component={Print} />
          <Route path="/merchant/end" exact component={End} />
          <Route path="/404" exact component={NotFound} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
