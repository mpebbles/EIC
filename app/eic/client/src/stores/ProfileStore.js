import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter {
  constructor() {
    super()
    this.profileInfo = [];
  }

  getInfo() {
    return this.profileInfo;
  }

  isEmpty() {
    if (!this.profileInfo.length) {
      return true;
    }
    else {
      return false;
    }
  }


  handleActions(action) {
    switch(action.type) {
      case "GET_INFO": {
        this.profileInfo = [];
        this.profileInfo.push(action.info);
        console.log("profile update")
        console.log(this.profileInfo)
        this.emit("change");
        break;
      }
      case "CHANGE_INFO": {
        //this.cardInfo = this.cardInfo.filter(
        //  person=>person.contact != action.cardEmail);
        this.emit("change");
        break;
      }
    }
  }
}


const profileStore = new ProfileStore;
dispatcher.register(profileStore.handleActions.bind(profileStore));

export default profileStore;
