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
    this.logout = this.logout.bind(this);
    this.goHome = this.goHome.bind(this)
    this.uploadImageHandler = this.uploadImageHandler.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.getImage = this.getImage.bind(this);
    this.state = {
      info: [{}],
      // for getting new values on save
      // 1 has existing value
      // 2 means user has left value blank
      // 1 and 2 make the input sources unique since one input has a defaultValue
      // of the user's previous input, and the other has a defaultValue of ""
      biography: "",
      company: "",
      skills: "",
      interests: "",
      selectedFile: null,
      profileImage: null,
    }
  }

  componentWillMount() {
    ProfileStore.on("change", this.getInfo);
    ProfileStore.on("change", this.getImage)
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
    ProfileStore.removeListener("change", this.getImage);
  }

  getImage() {
    this.setState({profileImage: ProfileStore.getImage()});
  }

  getInfo() {
    this.setState({info: ProfileStore.getInfo()},
      () => {
        if(this.state.info[0].hasOwnProperty('biography')) {
          this.setState({biography: this.state.info[0].biography})
        }
        if(this.state.info[0].hasOwnProperty('company')) {
          this.setState({company: this.state.info[0].company})
        }
        if(this.state.info[0].hasOwnProperty('skills')) {
          this.setState({skills: this.state.info[0].skills})
        }
        if(this.state.info[0].hasOwnProperty('interests')) {
          this.setState({interests: this.state.info[0].interests})
        }
      })
  }


  fileChangedHandler = (event) => {
    // roughly 5MB
    if(event.target.files[0].size > 8000000){
      alert("File is too big!");
      return;
    };
    this.setState({selectedFile: event.target.files[0]})
  //  console.log(this.state.selectedFile);
  }

  uploadImageHandler = () => {
    if(this.state.selectedFile != null) {
      ProfileActions.uploadImage(this.state.selectedFile);
    }
  }

  logout = () => {
    this.tokenService.logout();
    this.goHome();
  };

  goHome = () => {
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
          <ul>
              <li>
                <p className="input_name">Profile Image</p>
                <img className="profile_image"
                  src={this.state.profileImage}/>
                <div>
                  <input className="upload_input" type="file" onChange={this.fileChangedHandler}/>
                  <br />
                  <button className="upload_button" onClick={this.uploadImageHandler}>Upload</button>
                </div>
              </li>
            {this.state.info.length && (
              <li>
                <p className="input_name">Biography</p>
                <input onChange={e => this.setState({biography:e.target.value})} value={this.state.biography}></input>
              </li>
            )}
            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype == "Buddy" && (
                <li>
                  <p className="input_name">My Company</p>
                  <input onChange={e => this.setState({company:e.target.value})} value={this.state.company}></input>
                </li>
            )}

            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype == "Buddy" && (
                <li>
                  <p className="input_name">My Skills</p>
                  <input onChange={e => this.setState({skills:e.target.value})} value={this.state.skills}></input>
                </li>
            )}

            {this.state.info.length && this.state.info[0].hasOwnProperty('itemtype')
              && this.state.info[0].itemtype == "Student" && (
                <li>
                  <p className="input_name">My Interests</p>
                  <input onChange={e => this.setState({interests:e.target.value})} value={this.state.interests}></input>
                </li>
            )}
          </ul>
          <div className="buttons">
            <button onClick={ProfileActions.updateProfileInfo.bind(this,
              this.state)}>Save
            </button>
            <button onClick={this.goHome.bind(this)}>Cancel</button>
          </div>
        </div>
	  </div>
    );
  }
}
