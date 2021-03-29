import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Login from "./pages/login";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/Notfound";
import Pay from "./pages/Pay";


export const Context = createContext();
function App() {
  const [logined, setLogined] = useState(false);

  const [payItem, setPayItem] = useState([]);
  return (
    <Context.Provider value={{ payItem, setPayItem }}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/checkout" exact component={Checkout} />
          <Route path="/pay" exact component={Pay} />
          <Route path="/404" exact component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </Context.Provider>
  );
}

export default App;
