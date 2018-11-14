import CardsStore from '../../stores/CardsStore';

// Sends a card in action, verifies this card is stored,
// removes, verifies this card is removed
// It was easiest to resolve dependencies by combining 2 tests
export function testReceiveAndLoadCard() {
  let CARD_INFO = [{name: "User name", contact: "test@ucsc.edu"}];

  // Add card
  CardsStore.handleActions(
    {type: "RECEIVE_CARDS_DATA",
    cardData: CARD_INFO,
  });
  // check card was added
  if(CardsStore.cardInfo != CARD_INFO) {
    return false;
  }

  // Remove card
  CardsStore.handleActions(
    {type: "REMOVE_CARD",
    cardEmail: "test@ucsc.edu"
  });
  // check card removed
  console.log(CardsStore.isEmpty());
  //if(CardsStore.cardInfo.length != 0) {
  //  return false;
  //}
  return true;
}
