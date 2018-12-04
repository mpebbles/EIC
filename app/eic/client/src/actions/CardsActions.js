import axios from "axios";
import dispatcher from "../dispatcher";
import UserTypeService from "../components/UserTypeService";
import config from "../config.json";

export function loadCardsData() {
  let userTypeService = new UserTypeService();
  const token = localStorage.getItem("id_token");
  const userType = userTypeService.getUserType();

  if (userType === "Student") {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/get_buddy/",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res_1 => {
      const persons = res_1.data[0].a_buddy;
      dispatcher.dispatch({ type: "RECEIVE_CARDS_DATA", cardData: persons });
    });
  } else if (userType === "Buddy") {
    axios({
      method: "get",
      url: config.BASE_URL + "/api/get_student/",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res_2 => {
      const persons = res_2.data[0].a_student;
      dispatcher.dispatch({ type: "RECEIVE_CARDS_DATA", cardData: persons });
    });
  } else if (userType === "Company") {
    console.log("Loading company page...");
  }
}

export function deleteConnection(email) {
  let userTypeService = new UserTypeService();
  const token = localStorage.getItem("id_token");
  const userType = userTypeService.getUserType();
  try {
    if (userType === "Student") {
      axios({
        method: "get",
        url: config.BASE_URL + "/api/reject_buddy/" + email,
        headers: { Authorization: `Bearer ${token}` }
      }).then(res_1 => {
        if (
          window.confirm("Are you sure you want to delete this connection?")
        ) {
          //alert("Connection deleted!");
          dispatcher.dispatch({ type: "REMOVE_CARD", cardEmail: email });
        }
      });
    } else if (userType === "Buddy") {
      axios({
        method: "get",
        url: config.BASE_URL + "/api/reject_student/" + email,
        headers: { Authorization: `Bearer ${token}` }
      }).then(res_2 => {
        if (
          window.confirm("Are you sure you want to delete this connection?")
        ) {
          //alert("Connection deleted!");
          dispatcher.dispatch({ type: "REMOVE_CARD", cardEmail: email });
        }
      });
    }
  } catch (err) {
    //console.log(err);
  }
}
