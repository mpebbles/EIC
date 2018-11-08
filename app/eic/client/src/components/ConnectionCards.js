import React from "react";
import * as CardsActions from "../actions/CardsActions";
import CardsStore from "../stores/CardsStore";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import '../css/stupid.css'
import '../css/cards.css'
import '../css/generic.css'

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
              <FontAwesomeIcon
                icon="trash"
                size="1x"
                title="Send Request"
                color="#444444"
                className="delete_icon"
                onClick={CardsActions.deleteConnection.bind(this, person.contact)}
                />
          </li>
        )}
      </ul>
      {this.state.cardsData.length == 0 && (
        <p className="default_mesage"> You have no connections at this time. </p>
      )}
      </div>
    );
  }
}
