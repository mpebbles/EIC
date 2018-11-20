import React from "react";
import axios from "axios";
import "../css/cards.css";

export default class CardImage extends React.Component {
  constructor() {
    super();
    this.getImage = this.getImage.bind(this);
    this.state = {
      image: ""
    };
  }

  componentWillMount() {
    this.getImage(this.props.contact);
  }

  getImage(email) {
    const token = localStorage.getItem("id_token");
    try {
      axios({
        method: "get",
        url: "http://localhost:3000/api/getUserImage/" + email,
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        this.setState({ image: "data:image/png;base64," + res.data });
      });
    } catch (err) {
      //console.log(err);
    }
  }

  render() {
    return <img className="user_image" src={this.state.image} alt="" />;
  }
}
