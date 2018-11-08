import React from "react";
import { GoogleLogout } from "react-google-oauth";
import TokenService from "../components/TokenService";
import * as ProfileActions from "../actions/ProfileActions";
import ProfileStore from "../stores/ProfileStore";

import '../css/profile.css'

export default class UserProfile extends React.Component {

  constructor() {
    super();
    this.tokenService = new TokenService();
    this.getInfo = this.getInfo.bind(this);
    this.state = {
      info: []
    }
  }

  componentWillMount() {
    ProfileStore.on("change", this.getInfo);
  }

  componentDidMount() {
    // To avoid reloading data if not needed when component mounts
    // Will be called first time component mounts
    // We can always call ProfileActions.loadProfileInfo() when needed
    if (ProfileStore.isEmpty()) {
      ProfileActions.loadProfileInfo();
    }
    else {
      this.getInfo();
    }
  }

  componentWillUnmount() {
    ProfileStore.removeListener("change", this.getInfo);
  }

  getInfo() {
    this.setState({info: ProfileStore.getInfo()});
  }

  logout = () => {
    this.tokenService.logout();
    this.props.history.replace('/');
    window.location.reload(true);
  };


  // the logic for editing info works genericly for all account types
  // i.e. if a field type we want the user to be able to edit is present in then
  // info returned by the server, it will be displayed to the user
  // One call to get, one call to update
  render() {
    return (
      <div>
	      <div>
	        <h3>My Profile</h3>
	      </div>
	      <div class="edit_profile_info">
	        <GoogleLogout onLogoutSuccess={this.logout}/>
	      </div>

        <div class="edit_profile_info">
        <div><br />A profile image uploader will go here.<br /></div>
          <ul>
            {this.state.info.length && this.state.info[0].hasOwnProperty('biography') && (
              <li>
                <p className="input_name">Biography</p>
                <input value={this.state.info[0].biography}></input>
              </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Buddy"
              && !this.state.info[0].hasOwnProperty('company') && (
                <li>
                  <p className="input_name">My Company</p>
                  <input></input>
                </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Buddy"
              && this.state.info[0].hasOwnProperty('company') && (
                <li>
                  <p className="input_name">My Company</p>
                  <input value={this.state.info[0].company}></input>
                </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Buddy"
              && !this.state.info[0].hasOwnProperty('skills') && (
                <li>
                  <p className="input_name">My Skills</p>
                  <input></input>
                </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Buddy"
              && this.state.info[0].hasOwnProperty('skills') && (
                <li>
                  <p className="input_name">My Skills</p>
                  <input value={this.state.info[0].skills}></input>
                </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Student"
              && !this.state.info[0].hasOwnProperty('interests') && (
                <li>
                  <p className="input_name">My Interests</p>
                  <input></input>
                </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype === "Student"
              && this.state.info[0].hasOwnProperty('interests') && (
                <li>
                  <p className="input_name">My Interests</p>
                  <input value={this.state.info[0].interests}></input>
                </li>
            )}
          </ul>
        </div>
	  </div>
    );
  }
}
