import React from "react";
import { GoogleLogout } from "react-google-oauth";
import TokenService from "../components/TokenService";

export default class UserProfile extends React.Component {

  constructor() {
    super();
    this.tokenService = new TokenService();
  }

  logout = () => {
    this.tokenService.logout();
    this.props.history.replace('/');
    window.location.reload(true);
  };

  render() {
    return (
      <div>
	      <div>
	        <h3>My Profile</h3>
	      </div>
	      <div>
	        <GoogleLogout onLogoutSuccess={this.logout}/>
	      </div>
	  </div>
    );
  }
}
