import React from "react";
import { Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '../css/nav.css'
library.add(fas, fab);


export default class NavBar extends React.Component {
  render() {

    return (
      <div id="nav">
          <Link to="/">
            <FontAwesomeIcon
              icon="folder"
              size="1x"
              title="Resources"
              color="white"
              className="nav_item_left"
            />
          </Link>
          <Link to="/connect">
            <FontAwesomeIcon
              icon="user-friends"
              size="1x"
              color="white"
              className="nav_item_left"
              title="Establish Connections"
            />
          </Link>
          <Link to="/userconnections">
            <FontAwesomeIcon
              icon="address-book"
              size="1x"
              color="white"
              className="nav_item_left"
              title="My Connections"
              />
          </Link>
          <Link to="/userprofile">
            <FontAwesomeIcon
              icon="user"
              size="1x"
              color="white"
              className="nav_item_right"
              title="My Profile"
              />
          </Link>
      </div>
    );
  }
}
