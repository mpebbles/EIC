import React from "react";
import * as CardsActions from "../actions/CardsActions";
import CardsStore from "../stores/CardsStore";

import '../css/stupid.css'
import '../css/cards.css'

export default class ConnectionCards extends React.Component {
  constructor() {
    super();
    this.getCardsData = this.getCardsData.bind(this);

    this.state = {
      cardsData: [],
    };
  }

  componentWillMount() {
    //ResourcesActions.loadResources();
    CardsStore.on("change", this.getCardsData);
  }

  componentDidMount() {
    // To avoid reloading data if not needed when component mounts
    // Will be called first time component mounts
    // We can always call CardsActions.loadCardsData() when needed
    if (CardsStore.isEmpty()) {
      CardsActions.loadCardsData();
    }
    else {
      this.getCardsData()
    }
  }

  componentWillUnmount() {
    // Remember to do this to avoid memory leaks
    CardsStore.removeListener("change", this.getCardsData);
  }

  getCardsData() {
    this.setState({
      cardsData: CardsStore.getCardsData()
    });
  }

  render() {

    return (
      <div>
      <ul className="container card_holder">
        { this.state.cardsData.map(person =>
          <li className="card lifted padded third connection_card">
            <p className="name">{person.user_name}</p>
            <p className="contact_info">{person.contact}</p>
          </li>
        )}
      </ul>
      {this.state.cardsData.length == 0 && (
        <p> You have no connections at this time. </p>
      )}
      </div>
    );
  }
}
