import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class ContractsStore extends EventEmitter {
  constructor() {
    super();
    this.contracts = [];
  }

  getAll() {
    return this.contracts;
  }

  getContractById(id) {
    return this.contracts.find(function(item) {
      return item._id === id;
    });
  }

  isEmpty() {
    if (!this.contracts.length) {
      return true;
    } else {
      return false;
    }
  }

  handleActions(action) {
    switch (action.type) {
      case "CREATE_CONTRACT": {
        this.contracts.push(action.contract);
        this.emit("change");
        break;
      }
      case "DELETE_CONTRACT": {
        this.contracts = this.contracts.filter(function(item) {
          return item._id !== action.contract;
        });
        console.log("New contracts are", this.contracts);
        this.emit("change");
        break;
      }
      case "RECEIVE_CONTRACTS": {
        this.contracts = action.contracts;
        this.emit("change");
        break;
      }
      default:
        break;
    }
  }
}

const contractsStore = new ContractsStore();
dispatcher.register(contractsStore.handleActions.bind(contractsStore));

export default contractsStore;
