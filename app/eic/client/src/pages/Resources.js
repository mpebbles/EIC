import React from "react";
//import * as ResourcesActions from "../actions/ResourcesActions";
//import ResourcesStore from "../stores/ResourcesStore";
import ResourcesContent from "../components/ResourcesContent"

export default class Resources extends React.Component {

  render() {
    // search bar and create resources can go here in new components
    return (
      <div>
      <ResourcesContent/>
      </div>
    );
  }
}
