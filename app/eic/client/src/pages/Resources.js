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
    axios.get('http://localhost:3000/api/test')
      .then(res => {
        const persons = res.data[0].list_test;
        console.log(persons);
        this.setState({ persons });
      })
  }

  render() {

    return (
      <div>
        <h3>Resources</h3>
        <p>This is dummy info from a GET request to satisfy the ajax learning requirement</p>
        <ul>
        { this.state.persons.map(person => <li>{person.first_name}</li>)}
        </ul>
      </div>
    );
  }
}
