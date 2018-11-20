import React from "react";
import * as ECActions from "../actions/ECActions";
import ECStore from "../stores/ECStore";
import InfoBox from "./InfoBox";

import "../css/generic.css";

export default class BuddySearch extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);

    this.state = {
      searchBarValue: "Search for a buddy by name or by skills...",
      searchResults: []
    };
  }

  componentWillMount() {
    //ResourcesActions.loadResources();
    ECStore.on("change", this.getSearchResults);
  }

  componentWillUnmount() {
    // Remember to do this to avoid memory leaks
    ECStore.removeListener("change", this.getSearchResults);
  }

  getSearchResults() {
    this.setState({
      searchResults: ECStore.getSearchResults()
    });
  }

  handleChange(e) {
    const userInput = e.target.value;
    ECActions.loadBuddySearchResults(userInput);
  }

  render() {
    return (
      <div>
        <input
          className="searchBar"
          placeholder={this.state.searchBarValue}
          onChange={e => {
            this.handleChange(e);
          }}
        />
        <ul className="list_container">
          {this.state.searchResults.map(person => (
            <InfoBox
              email={person.contact}
              biography={person.biography}
              skills={person.skills}
              name={person.user_name}
            />
          ))}
        </ul>
      </div>
    );
  }
}
