import React from "react";
import * as ECActions from "../actions/ECActions";
import ECStore from "../stores/ECStore";
import InfoBox from "./InfoBox"


export default class BuddySearch extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);

    this.state = {
      searchBarValue: "Search for buddies...",
      searchResults: [],
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
        <input placeholder={this.state.searchBarValue} onChange={(e) => {this.handleChange(e)}}/>
        <p>Search results will go down here</p>
        <ul className="list_container">
        { this.state.searchResults.map(person =>
          <InfoBox accountId="1" name="Mitchell Pebbles"/>
        )}
        </ul>
      </div>
    );
  }
}
