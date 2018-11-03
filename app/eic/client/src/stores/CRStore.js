import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CRStore extends EventEmitter {
  constructor() {
    super()
    this.requests = [];

  }

  getAll() {
    return this.requests;
  }

  isEmpty() {
    if (!this.requests.length) {
      return true;
    }
    else {
      return false;
    }
  }

  handleActions(action) {
    switch(action.type) {
      //case "CREATE_RESOURCE": {
      //  this.createResource(action.text);
      //  break;
      //}
      case "RECEIVE_REQUESTS": {
        this.requests = action.requests;
        this.emit("change");
        break;
      }
    }
  }
}



const cRStore = new CRStore;
dispatcher.register(cRStore.handleActions.bind(cRStore));

export default cRStore;