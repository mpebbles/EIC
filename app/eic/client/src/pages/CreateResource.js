import React, { Component } from "react";
import axios from "axios";
import config from "../config";
import dispatcher from "../dispatcher";

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
        const token = localStorage.getItem("id_token");
        var sendObj = {};
        sendObj["title"] = this.state.title;
        sendObj["skills"] = this.state.skills;
        sendObj["content"] = this.state.content;
        try {
            axios({
                method: "post",
                url: config.BASE_URL + "/api/createResource/",
                data: sendObj,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            }).then(res => {
                window.location.reload(true);
            });
        } catch (err) {
            console.log(err);
        }

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
