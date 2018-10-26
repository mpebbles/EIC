import dispatcher from "../dispatcher";
import axios from 'axios';

export function loadCardsData() {
  // TODO replace call
  axios.get("http://localhost:3000/api/test")
  .then(res => {
    const persons = res.data[0].list_test;
    dispatcher.dispatch({type: "RECEIVE_CARDS_DATA", cardData: persons})})
}
