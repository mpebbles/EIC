import dispatcher from "../dispatcher";
import axios from "axios";

export function loadRequests() {
  const token = localStorage.getItem("id_token");
  try {
    axios({
      method: "get",
      url: "http://localhost:3000/api/get_pending_student/",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      const persons = res.data[0].a_student;
      dispatcher.dispatch({ type: "RECEIVE_REQUESTS", requests: persons });
    });
  } catch (err) {
    // No matches
  }
}

export function denyRequest(email) {
  const token = localStorage.getItem("id_token");
  try {
    axios({
      method: "get",
      url: "http://localhost:3000/api/reject_pending_student/" + email,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      alert("Request deleted!");
      dispatcher.dispatch({ type: "REMOVE_REQUEST", removeEmail: email });
    });
  } catch (err) {
    console.log(err);
  }
}

export function acceptRequest(email) {
  const token = localStorage.getItem("id_token");
  try {
    axios({
      method: "get",
      url: "http://localhost:3000/api/accept_pending_student/" + email,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      alert("Request accepted!");
      dispatcher.dispatch({ type: "REMOVE_REQUEST", removeEmail: email });
    });
  } catch (err) {
    console.log(err);
  }
}
