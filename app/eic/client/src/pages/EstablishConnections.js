import React from "react";
import BuddySearch from "../components/BuddySearch";
import ConnectionRequest from "../components/ConnectionRequest";
import UserTypeService from "../components/UserTypeService";

export default class EstablishConnections extends React.Component {
  constructor() {
    super();
    this.userTypeService = new UserTypeService();
    this.userType = this.userTypeService.getUserType();
  }

  render() {
    if (this.userType === "Student") {
      return (
        <div>
          <h3>Find Buddies</h3>
          <BuddySearch />
        </div>
      );
    } else {
      return (
        <div>
          <h3>Connection Requests</h3>
          <ConnectionRequest />
        </div>
      );
    }
  }
}
