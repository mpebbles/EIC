import React from "react";
import { withRouter } from "react-router-dom";
import * as ResourcesActions from "../actions/ResourcesActions";
import ResourcesStore from "../stores/ResourcesStore";
import ResourceEntry from "./ResourceEntry";


class ResourcesContent extends React.Component {
  constructor() {
    super();
    this.getResources = this.getResources.bind(this);
    this.newResource = this.newResource.bind(this);
    this.state = {
      resources: []
    };
  }

  componentWillMount() {
    //ResourcesActions.loadResources();
    ResourcesStore.on("change", this.getResources);
  }

  componentDidMount() {
    // To avoid reloading data if not needed when component mounts
    // Will be called first time component mounts
    // We can always call ResourcesActions.loadResources() when needed
    if (ResourcesStore.isEmpty()) {
      ResourcesActions.loadResources();
    } else {
      this.getResources();
    }
  }

  componentWillUnmount() {
    // Remember to do this to avoid memory leaks
    ResourcesStore.removeListener("change", this.getResources);
  }

  getResources() {
    this.setState({
      resources: ResourcesStore.getAll()
    });
  }

  newResource() {
    this.props.history.push('/resource/create');
  }

  render() {
    return (
      <div>
        <div>
          <h3>Resources</h3>
          <button onClick={this.newResource}>Create Resource</button>
        </div>
        <ul>
          {this.state.resources.map(resource => (
            <ResourceEntry content={resource} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(ResourcesContent);
