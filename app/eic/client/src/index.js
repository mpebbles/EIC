import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
//import './css/stupid.css'
import * as serviceWorker from "./serviceWorker";
import Layout from "./Layout";
import Login from "./components/Login";
import Register from "./pages/Register";
import { GoogleAPI } from "react-google-oauth";
import config from "./config.json";
import { BrowserRouter, Route } from "react-router-dom";

//import { runAll } from "./testing/driver";

// also remember to set supplyTestValues to true in factory.js if any test will be run
//runAll();

ReactDOM.render(
  <GoogleAPI
    clientId={config.GOOGLE_CLIENT_ID}
    onUpdateSigninStatus={console.log("Sign in status updated")}
    onInitFailure={console.log("Signin init failed")}
  >
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Layout} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </GoogleAPI>,
  document.getElementById("app")
);

serviceWorker.unregister();
