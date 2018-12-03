import axios from "axios";
import dispatcher from "../dispatcher";
import UserTypeService from "../components/UserTypeService";
import { factoryUpdateProfileInfo } from "../factory";
import config from "../config.json";

export function uploadImage(uploadImage) {
  const token = localStorage.getItem("id_token");
  //console.log(uploadImage);
  const file = new Blob([uploadImage], { type: "image/png" });
  const formData = new FormData();
  formData.append("uploadedImage", file, file.filename);
  try {
    axios({
      method: "post",
      url: config.BASE_URL + "/api/add_user_image/",
      data: formData,
      headers: { "Content-Type": "false", Authorization: `Bearer ${token}` }
    }).then(res => {
      console.log(file);
      dispatcher.dispatch({ type: "UPDATE_IMAGE", image: file });
    });
  } catch (err) {
    //console.log(err);
  }
}

export function downloadImage(email) {
  const token = localStorage.getItem("id_token");
  try {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/getUserImage/" + email,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      dispatcher.dispatch({ type: "RECEIVE_IMAGE", image: res.data });
    });
  } catch (err) {
    //console.log(err);
  }
}

export function loadProfileInfo() {
  let userTypeService = new UserTypeService();
  const token = localStorage.getItem("id_token");
  const userType = userTypeService.getUserType();

  if (userType === "Student") {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/get_student_profile/",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res_1 => {
      const person = res_1.data[0].a_user;
      dispatcher.dispatch({ type: "GET_INFO", info: person });
    });
  } else if (userType === "Buddy") {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/get_buddy_profile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res_2 => {
      const persons = res_2.data[0].a_user;
      dispatcher.dispatch({ type: "GET_INFO", info: persons });
    });
  } else if (userType === "Company") {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/getCompanyProfile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res_3 => {
      const persons = res_3.data[0].a_user;
      dispatcher.dispatch({ type: "GET_INFO", info: persons });
    });
  } else {
    //console.log("Invalid userType");
  }
}

export function updateProfileInfo(state) {
  var sendObj = {};
  sendObj["biography"] = state.biography;
  // set new local value to update
  state.info[0]["biography"] = state.biography;
  if (
    state.info[0].hasOwnProperty("itemtype") &&
    state.info[0].itemtype === "Student"
  ) {
    sendObj["interests"] = state.interests;
    // set new local value to update
    state.info[0]["interests"] = state.interests;
  } else if (
    state.info[0].hasOwnProperty("itemtype") &&
    state.info[0].itemtype === "Buddy"
  ) {
    sendObj["skills"] = state.skills;
    sendObj["company"] = state.company;
    // set new local value to update
    state.info[0]["skills"] = state.skills;
    state.info[0]["company"] = state.company;
  }

  const token = localStorage.getItem("id_token");
  try {
    var postURL = "";
    if (this.state.info[0].itemtype === "Buddy") {
      postURL = config.BASE_URL + "/api/edit_buddy_profile/";
    } else if (this.state.info[0].itemtype === "Student") {
      postURL = config.BASE_URL + "/api/edit_student_profile/";
    } else if (this.state.info[0].itemtype === "Company") {
      postURL = config.BASE_URL + "/api/editCompanyProfile/";
    }
    const args = {
      method: "post",
      url: postURL,
      data: sendObj,
      headers: { Authorization: `Bearer ${token}` }
    };
    // call factory to get API function if not unit test, else don't call actual API
    // Then will fail if not axios call, so return value in catch for unit test
    factoryUpdateProfileInfo(args).then(res => {
      dispatcher.dispatch({ type: "GET_INFO", info: state.info[0] });
    });
  } catch (err) {
    // return for the sake of unit test
    return state.info[0];
  }
  // so the user can tell something happened after save
  window.location.reload(true);
}
