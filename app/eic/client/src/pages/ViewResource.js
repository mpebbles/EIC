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

    deleteResource() {
        console.log("Deleted resource", this.state.resource._id);
        ResourceActions.deleteResource(this.state.resource._id);
    }

    componentDidMount() {
        let newResource = ResourcesStore.getResourceById(this.props.match.params.id);
        console.log("Loaded resource", newResource);
        this.setState({ resource: newResource, doneLoading: true });
    }

    render() {
        return (
            <div>
                { this.state.doneLoading &&
                <div>
                  <h6>{this.state.resource.title}</h6>
                  <button onClick={this.deleteResource}>Delete Resource</button>
                    <div>
                        Author: {this.state.resource.creator}
                    </div>
                    <div>
                        Created on: {this.state.resource.creation_date}
                    </div>
                    <div>
                        {this.state.resource.content}
                    </div>
                </div> }
            </div>
        );
    }
}

export default withRouter(ViewResource);
