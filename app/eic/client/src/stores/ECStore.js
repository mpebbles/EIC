import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ECStore extends EventEmitter {
  constructor() {
    super()
    this.searchResults = [];
    // TODO: Change how this is set
    this.isStudent = false;
  }

  getSearchResults() {
    return this.searchResults;
  }

  isStudentAccount() {
    return this.isStudent;
  }

  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_BUDDY_SEARCH": {
        this.searchResults = action.resources;
        this.emit("change");
        break;
      }
    }
  }
}


const ecStore = new ECStore;
dispatcher.register(ecStore.handleActions.bind(ecStore));

export default ecStore;
