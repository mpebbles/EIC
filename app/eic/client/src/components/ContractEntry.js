import React from "react";
import { withRouter } from "react-router-dom";

class ContractEntry extends React.Component {
  constructor() {
    super();
    this.viewContract = this.viewContract.bind(this);
  }

  viewContract() {
    this.props.history.push("/contract/view=" + String(this.props.content._id));
  }

  render() {
    return (
      <div>
        <h6>
          <a onClick={this.viewContract}>{this.props.content.title}</a>
        </h6>
        {this.props.content.content}
        {this.props.content.creator}
        {this.props.content.creation_date}
        {this.props.content._id}
      </div>
    );
  }
}

export default withRouter(ContractEntry);
