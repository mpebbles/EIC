import React from "react";
import * as ECActions from "../actions/ECActions";
import ECStore from "../stores/ECStore";


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
        <ul>
        <p>Search results will go down here</p>
        { this.state.searchResults.map(person => <li>{person.first_name}</li>)}
        </ul>
      </div>
    );
  }
}
