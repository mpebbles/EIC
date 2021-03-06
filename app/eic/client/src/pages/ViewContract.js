import React from "react";
import { withRouter } from "react-router-dom";
import * as ContractsActions from "../actions/ContractsActions";
import ContractsStore from "../stores/ContractsStore";

class ViewContract extends React.Component {
  constructor() {
    super();
    this.deleteContract = this.deleteContract.bind(this);
    this.state = {
      contract: [],
      doneLoading: false
    };
  }

  componentDidMount() {
    let newContract = ContractsStore.getContractById(
      this.props.match.params.id
    );
    this.setState({ contract: newContract, doneLoading: true });
  }

  deleteContract() {
    ContractsActions.deleteContract(this.state.contract._id);
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.state.doneLoading && (
          <div>
            <h6>{this.state.contract.title}</h6>
            <button onClick={this.deleteContract}>Delete Contract</button>
            <div className="list_item">Pay: {this.state.contract.pay}</div>
            <div className="list_item">Location: {this.state.contract.location}</div>
            <div className="list_item">Created by: {this.state.contract.creation_date}</div>
            <div className="list_item">Created on: {this.state.contract.creator}</div>
            <div><br/><br/>{this.state.contract.description}</div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ViewContract);
