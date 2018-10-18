import React from "react";
import axios from 'axios';

export default class Resources extends React.Component {
  constructor() {
    super();
    this.state = {
      persons: []
    }
  }

  // TODO: actually implement in Flux flow
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  render() {

    return (
      <div>
        <h3>Resources</h3>
        <p>This is dummy info from a GET request to satisfy the ajax learning requirement</p>
        <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      </div>
    );
  }
}
