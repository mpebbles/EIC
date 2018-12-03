import React, { Component } from "react";
import * as ContractsActions from "../actions/ContractsActions";

class CreateContract extends Component {
  constructor() {
    super();
    this.postNewContract = this.postNewContract.bind(this);
    this.state = {
      title: "",
      pay: "",
      skills: "",
      location: "",
      description: ""
    };
  }

  postNewContract() {
    ContractsActions.createContract(
      this.state.title,
      this.state.pay,
      this.state.skills,
      this.state.location,
      this.state.description
    );
    window.location.reload(true);
  }

  render() {
    return (
      <div>
        <h6>New Contract</h6>
        <ul>
          <li>
            <p className="input_title">Title</p>
            <input
              onChange={e => this.setState({ title: e.target.value })}
              value={this.state.biography}
            />
          </li>
          <li>
            <p className="input_pay">Title</p>
            <input
              onChange={e => this.setState({ pay: e.target.value })}
              value={this.state.biography}
            />
          </li>
          <li>
            <p className="input_skills">Related Skills</p>
            <input
              onChange={e => this.setState({ skills: e.target.value })}
              value={this.state.biography}
            />
          </li>
          <li>
            <p className="input_title">Title</p>
            <input
              onChange={e => this.setState({ location: e.target.value })}
              value={this.state.biography}
            />
          </li>
          <li>
            <p className="input_content">Content</p>
            <input
              onChange={e => this.setState({ description: e.target.value })}
              value={this.state.biography}
            />
          </li>
        </ul>
        <button onClick={this.postNewContract}>Create Contract</button>
      </div>
    );
  }
}

export default CreateContract;
