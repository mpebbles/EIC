import React from "react";
import ResourcesContent from "../components/ResourcesContent"

export default class Resources extends React.Component {

  constructor() {
    super();
  }

  // newResource() {
  //   this.props.history.replace('/login');
  // }

  render() {
    // search bar and create resources can go here in new components
    return (
      <div>
      {/*<button onClick={this.newResource()} type="button">Create Resource</button>*/}
      <ResourcesContent/>
      </div>
    );
  }
}
