
import React from "react";
import BuddySearch from "../components/BuddySearch"
import ConnectionRequest from "../components/ConnectionRequest"

export default class EstablishConnections extends React.Component {
  render() {

    // The below true and false will be replaced
    if(true) {
      return (
        <div>
          <h3>Find Buddies</h3>
          <BuddySearch/>
        </div>
        );
    }
    else if (false) {
      return (
        <div>
          <h3>Connection Requests</h3>
          <ConnectionRequest />
        </div>
      )
    }
  }
}
