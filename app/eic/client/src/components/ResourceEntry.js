import React from "react";
import { withRouter, Link } from "react-router-dom";

class ResourceEntry extends React.Component {

  constructor() {
    super();
    this.viewResource = this.viewResource.bind(this);
  }

    viewResource() {
      console.log("navigating to view");
        this.props.history.push('/resource/view');
    }

  render() {
    return (
      <div>
          <h6><a onClick={this.viewResource}>{this.props.content}</a></h6>
        {this.props.content}
      </div>
    );
  }
}

export default withRouter(ResourceEntry);
