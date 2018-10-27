
import React from "react";
import BuddySearch from "../components/BuddySearch"
import ConnectionRequest from "../components/ConnectionRequest"

// Using this to store account type as well..Slight hack, but the most
// straightforward way I could think of.
import ECStore from "../stores/ECStore";

export default class EstablishConnections extends React.Component {
  render() {

    // The below true and false will be replaced
    if(ECStore.isStudentAccount()) {
      return (
        <div>
          <h3>Find Buddies</h3>
          <BuddySearch/>
        </div>
        );
    }
    else {
      return (
        <div>
          <h3>Connection Requests</h3>
          <ConnectionRequest />
        </div>
      )
    }
  }
}
