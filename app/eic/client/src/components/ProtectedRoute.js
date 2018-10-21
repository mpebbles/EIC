import React from "react";
import { BrowserRouter as Route } from "react-router-dom";
import { Redirect } from 'react-router';
import TokenService from "./TokenService";

const tokenService = new TokenService();

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    tokenService.loggedIn() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

export default ProtectedRoute;