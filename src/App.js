import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/login";
import Checkout from "./pages/merchant/Checkout";
import NotFound from "./pages/Notfound";
import Pay from "./pages/Pay";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/admin/Dashboard";
import Stock from "./pages/admin/Stock";
import CustomerView from "./pages/CustomerView";
import ReportHub from "./pages/admin/Report";
import firebase from "./firebase";
import Test from "./pages/Test";
// firebase.firestore().useEmulator("localhost", 8080);
export const Context = createContext();
function App() {
  const [logined, setLogined] = useState(false);

  const [GlobalItem, setGlobalItem] = useState([]);

  return (
    <Context.Provider value={{ GlobalItem, setGlobalItem }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/test" exact component={Test} />
          <Route path="/merchant/checkout" exact component={Checkout} />
          <Route path="/merchant/customer" exact component={CustomerView} />
          <Route path="/pay" exact component={Pay} />
          <Route path="/404" exact component={NotFound} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/dashboard" exact component={Dashboard} />
          <Route path="/admin/stock" exact component={Stock} />
          <Route path="/admin/report/hub" exact component={ReportHub} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
