import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import axios from 'axios';

class ECStore extends EventEmitter {
  constructor() {
    super()
    this.setAccountType = this.setAccountType.bind(this);
    //this.setAccountType();
    this.searchResults = [];
    // TODO: Change how this is set

    this.isStudent =  true; // default?
  }

  // TODO: call setAccountType if not already called by other componenent from any component
  // that needs to know account type
  setAccountType() {
    const token = localStorage.getItem('id_token');
    try {
      axios({ method: 'get', url: 'http://localhost:3000/api/get_user_type/',  headers: { Authorization: `Bearer ${token}` },
      }).then(res => {
        if(res.data == 'Student') {
          this.isStudent = true;
        }
        else {
          console.log("HERE!")
          this.isStudent = false;
        }
        this.emit("change");
      })
    }
    catch(err) {
      console.log(err);
    }
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
