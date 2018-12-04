import React, { Component } from "react";
import * as ResourceActions from "../actions/ResourcesActions";

class CreateResource extends Component {
  constructor() {
    super();
    this.postNewResource = this.postNewResource.bind(this);
    this.state = {
      title: "",
      skills: "",
      content: ""
    };
  }

  postNewResource() {
    ResourceActions.createResource(
      this.state.title,
      this.state.skills,
      this.state.content
    );
    window.location.reload(true);
  }

  render() {
    return (
      <div>
        <h6>New Resource</h6>
        <ul>
          <li>
            <p className="input_title">Title</p>
            <input
              onChange={e => this.setState({ title: e.target.value })}
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
            <p className="input_content">Content</p>
            <input
              onChange={e => this.setState({ content: e.target.value })}
              value={this.state.biography}
            />
          </li>
        </ul>
        <button onClick={this.postNewResource}>Create Resource</button>
      </div>
    );
  }
}

export default CreateResource;
