import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ProfileStore extends EventEmitter {
  constructor() {
    super()
    this.profileInfo = [];
    this.profileImage = null;
  }

  getInfo() {
    return this.profileInfo;
  }

  getImage() {
    return this.profileImage;
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
        this.emit("change");
        break;
      }
      case "CHANGE_INFO": {
        //this.cardInfo = this.cardInfo.filter(
        //  person=>person.contact != action.cardEmail);
        this.emit("change");
        break;
      }
      case "UPDATE_IMAGE": {
        var reader = new FileReader();
        const that = this;
        reader.onload = function(event) {
          that.profileImage = event.target.result;
          that.emit("change");
        };
        reader.readAsDataURL(action.image);
        break;
      }
      case "RECEIVE_IMAGE": {
        this.profileImage =  "data:image/png;base64,"+ action.image;
        this.emit("change");
        break;
      }
      default:
        break;
    }
  }
}


const profileStore = new ProfileStore();
dispatcher.register(profileStore.handleActions.bind(profileStore));

export default profileStore;
