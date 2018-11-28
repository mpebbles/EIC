import React, { Component } from "react";
import { GoogleLogin } from "react-google-oauth";
import TokenService from "../components/TokenService";
import UserTypeService from "../components/UserTypeService";
import config from '../config.json'

class Register extends Component {
  constructor(props) {
    super(props);
    this.tokenService = new TokenService();
    this.userTypeService = new UserTypeService();
  }

  executeLogin = response => {
    const tokenBlob = new Blob(
      [
        JSON.stringify(
          { access_token: response.getAuthResponse().access_token },
          null,
          2
        )
      ],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
      headers: {
        "x-account-type": document.getElementById("accounttype").value,
        "x-user-name": document.getElementById("username").value
      }
    };
    fetch(
      config.BASE_URL + "/googleapi/v1/auth/google-register",
      options
    ).then(r => {
      const token = r.headers.get("x-auth-token");
      this.userTypeService.setUserType(r.headers.get("x-user-type"));
      r.json().then(user => {
        if (token) {
          this.tokenService.setToken(token);
          this.props.history.replace("/");
        }
      });
    });
  };

  render() {
    return (
      <div>
        <center>
          <h3>
            Oops, looks like you haven't made an account yet. Please register
            below:
          </h3>
          Please choose your account type:
          <select id="accounttype">
            <option value="Student">Student</option>
            <option value="Buddy">Buddy</option>
            <option value="Company">Company</option>
          </select>
          Please enter a username:
          <input type="text" id="username" />
          <div>
            <GoogleLogin onLoginSuccess={this.executeLogin} Text="Register" />
          </div>
        </center>
      </div>
    );
  }
}

export default Register;
