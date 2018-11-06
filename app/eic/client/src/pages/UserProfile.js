import React from "react";
import { GoogleLogout } from "react-google-oauth";
import TokenService from "../components/TokenService";
import * as ProfileActions from "../actions/ProfileActions";
import ProfileStore from "../stores/ProfileStore";

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
