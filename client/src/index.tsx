import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { checkAuthToken } from "./auth";
import { App } from "./components";
import store from "./redux/store";
import { unregister } from "./registerServiceWorker";
import "./styles/index.scss";

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
unregister(); //
