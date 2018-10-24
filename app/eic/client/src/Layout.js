import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Resources from './pages/Resources'
import EstablishConnections from './pages/EstablishConnections'
import Connections from './pages/Connections'
import UserProfile from './pages/UserProfile'
import './css/main.css'
import './css/stupid.css'
import TokenService from './components/TokenService';

export default class Layout extends React.Component {

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
      <div id="main">
        <BrowserRouter>
          <div id="middle">
            <NavBar></NavBar>
            <div id="content">
            <Route exact path="/" component={Resources}/>
            <Route path="/connect" component={EstablishConnections}/>
            <Route path="/userconnections" component={Connections}/>
            <Route path="/userprofile" component={UserProfile}/>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }

}
