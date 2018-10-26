import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CardsStore extends EventEmitter {
  constructor() {
    super()
    this.cardInfo = []
  }

  getCardsData() {
    return this.cardInfo;
  }

  isEmpty() {
    if (!this.cardInfo.length) {
      return true;
    }
    else {
      return false;
    }
  }


  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_CARDS_DATA": {
        this.cardInfo = action.cardData;
        this.emit("change");
        break;
      }
    }
  }
}


const cardsStore = new CardsStore;
dispatcher.register(cardsStore.handleActions.bind(cardsStore));

export default cardsStore;
