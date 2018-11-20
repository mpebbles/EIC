import React from "react";

export default class ResourceEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>
          {this.props.content}
        </h3>
          {this.props.content}
      </div>
    );
  }
}
