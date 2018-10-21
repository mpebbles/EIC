import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { GoogleLogout } from "react-google-oauth";
import Resources from "./Resources";
import Contracts from "./Contracts";
import Search from "./Search";
import UserProfile from "./UserProfile";
import InfoPage from "./InfoPage";
import TokenService from "./TokenService";
import ProtectedRoute from "./ProtectedRoute";

class NavigationPage extends Component {

  constructor() {
    super();
    this.tokenService = new TokenService();
  }

  componentDidMount(){
    if(!this.tokenService.loggedIn()){
      this.props.history.replace('/login');
    }
  }

  render() {
    return (
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Homepage</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              <li>
                <Link to="/contracts">Contracts</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <div>
                  <GoogleLogout onLogoutSuccess={this.logout}/>
              </div>
            </ul>

            <hr />

            <ProtectedRoute exact path="/" component={InfoPage} />
            <ProtectedRoute path="/resources" component={Resources} />
            <ProtectedRoute path="/contracts" component={Contracts} />
            <ProtectedRoute path="/search" component={Search} />
            <ProtectedRoute path="/profile" component={UserProfile} />
          </div>
        </Router>
    );
  }

  logout = () => {
    this.tokenService.logout();
    this.props.history.replace('/login');
  };
  
}

export default NavigationPage;
