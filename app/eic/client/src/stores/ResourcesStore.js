import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ResourcesStore extends EventEmitter {
  constructor() {
    super()
    this.resources = [];

  }

  getAll() {
    return this.resources;
  }

  isEmpty() {
    if (!this.resources.length) {
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
      case "RECEIVE_RESOURCES": {
        this.resources = action.resources;
        this.emit("change");
        break;
      }
      default:
        break;
    }
  }
}



const resourcesStore = new ResourcesStore();
dispatcher.register(resourcesStore.handleActions.bind(resourcesStore));

export default resourcesStore;
