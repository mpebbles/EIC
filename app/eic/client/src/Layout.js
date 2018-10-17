import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import Resources from './pages/Resources'
import SearchBuddies from './pages/SearchBuddies'
import UserBuddies from './pages/UserBuddies'
import UserProfile from './pages/UserProfile'
import './css/main.css'
import './css/stupid.css'



export default class Layout extends React.Component {
  render() {

    return (
      <div id="main">
      <BrowserRouter>




          <div id="middle">
            <NavBar></NavBar>
            <div id="content">
            <Route exact path="/" component={Resources}/>
            <Route path="/findbuddy" component={SearchBuddies}/>
            <Route path="/userbuddies" component={UserBuddies}/>
            <Route path="/userprofile" component={UserProfile}/>
            </div>
          </div>



      </BrowserRouter>
      </div>
    );
  }
}
