import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ResourcesStore extends EventEmitter {
  constructor() {
    super();
    this.resources = [];
  }

  getAll() {
    return this.resources;
  }

  getResourceById(id) {
      return this.resources.find(function(item){
        return item._id === id;
      });
  }

  isEmpty() {
    if (!this.resources.length) {
      return true;
    } else {
      return false;
    }
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_RESOURCE": {
        this.resources.push(action.resource);
        this.emit("change");
        break;
      }
      case "DELETE_RESOURCE": {
        this.resources = this.resources.filter(function(item){
          return item._id !== action.resource;
        });
        console.log("New resources are", this.resources);
        this.emit("change");
        break;
      }
      case "RECEIVE_RESOURCES": {
        this.resources = action.resources;
        this.emit("change");
        break;
      }
      default:
        console.log("Uncaught action in ResourcesStore");
        break;
    }
  }
}

const resourcesStore = new ResourcesStore();
dispatcher.register(resourcesStore.handleActions.bind(resourcesStore));

export default resourcesStore;
