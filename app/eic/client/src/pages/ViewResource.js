import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import * as ResourceActions from "../actions/ResourcesActions";
import ResourcesStore from "../stores/ResourcesStore";

class ViewResource extends Component {
  constructor() {
    super();
    this.deleteResource = this.deleteResource.bind(this);
    this.state = {
      resource: [],
      doneLoading: false
    };
  }

  componentDidMount() {
    let newResource = ResourcesStore.getResourceById(
      this.props.match.params.id
    );
    this.setState({ resource: newResource, doneLoading: true });
  }

  deleteResource() {
    ResourceActions.deleteResource(this.state.resource._id);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.state.doneLoading && (
          <div>
            <h6>{this.state.resource.title}</h6>
            <button onClick={this.deleteResource}>Delete Resource</button>
            <div className="list_item">Author: {this.state.resource.creator}</div>
            <div className="list_item">Created on: {this.state.resource.creation_date}</div>
            <div><br/><br/>{this.state.resource.content}</div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ViewResource);
