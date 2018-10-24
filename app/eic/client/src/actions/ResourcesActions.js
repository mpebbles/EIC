import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadResources() {
  axios.get("http://localhost:3000/api/test")
  .then(res => {
    //console.log(res.data);
    const persons = res.data[0].list_test;
    dispatcher.dispatch({type: "RECEIVE_RESOURCES", resources: persons})})
}
