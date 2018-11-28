import React from "react";
import ResourcesContent from "../components/ResourcesContent";
import CreateResource from "../pages/CreateResource";

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
