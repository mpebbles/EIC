import config from "../config";
import dispatcher from "../dispatcher";
import axios from "axios";

export function loadContracts() {
  const token = localStorage.getItem("id_token");
  axios({
    method: "get",
    url: config.BASE_URL + "/api/getContracts/",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    var contracts = JSON.stringify(res.data);
    contracts = JSON.parse(contracts);
    contracts = JSON.parse(JSON.stringify(contracts[0])).contracts;
    dispatcher.dispatch({ type: "RECEIVE_CONTRACTS", contracts: contracts });
  });
}

export function deleteContract(id) {
  const token = localStorage.getItem("id_token");
  var sendObj = {};
  sendObj["id"] = id;
  axios({
    method: "post",
    url: config.BASE_URL + "/api/deleteContractById/",
    headers: { Authorization: `Bearer ${token}` },
    data: sendObj
  }).then(res => {
    dispatcher.dispatch({ type: "DELETE_CONTRACT", contract: id });
  });
}

export function createContract(title, pay, skills, location, description) {
  const token = localStorage.getItem("id_token");
  var sendObj = {};
  sendObj["title"] = title;
  sendObj["skills"] = skills;
  sendObj["pay"] = pay;
  sendObj["location"] = location;
  sendObj["description"] = description;
  try {
    axios({
      method: "post",
      url: config.BASE_URL + "/api/createContract/",
      data: sendObj,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).then(res => {});
  } catch (err) {
    console.log(err);
  }
}
