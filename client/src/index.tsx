import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.scss";

import { App } from "./components";
import { unregister } from "./registerServiceWorker";
import store from "./store";
import { checkAuthToken } from "./utils/auth";

/**
 *  Check for auth token
 */
checkAuthToken();

/**
 *  Mount app
 */
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

/**
 *  Register service worker
 */
unregister();
