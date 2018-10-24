import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadBuddySearchResults(searchText) {
  // Currently being implemented
  console.log("searchText: " + searchText);
  axios.get("http://localhost:3000/api/test")
  .then(res => {
    //console.log(res.data);
    const persons = res.data[0].list_test;
    dispatcher.dispatch({type: "RECEIVE_BUDDY_SEARCH", resources: persons})})
}
