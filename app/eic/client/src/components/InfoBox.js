import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import * as ECActions from "../actions/ECActions";
import * as CRActions from "../actions/CRActions";
import ECStore from "../stores/ECStore";
import "../css/stupid.css";
import "../css/generic.css";
import UserTypeService from "./UserTypeService";

library.add(fas, fab);

export default class InfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.userTypeService = new UserTypeService();
    this.userType = this.userTypeService.getUserType();
    this.state = {
      // toggle box is closed initially
      isOpened: false
    };
    this.toggleBox = this.toggleBox.bind(this);
    this.acceptRequest = this.acceptRequest.bind(this);
    this.denyRequest = this.denyRequest.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentWillMount() {}

  toggleBox() {
    // check if box is currently opened
    const { isOpened } = this.state;
    this.setState({
      // toggle value of `isOpened`
      isOpened: !isOpened
    });
  }

  acceptRequest() {
    CRActions.acceptRequest(this.props.email);
  }

  denyRequest() {
    CRActions.denyRequest(this.props.email);
  }

  sendRequest() {
    ECActions.sendRequest(this.props.email);
  }

  render() {
    return (
      <li className="box_li">
        <div className="title_and_button">
          <div className="title">{this.props.name}</div>
          <div className="skills">{this.props.skills}</div>
          <div className="top_button_div" onClick={this.toggleBox}>
            {!this.state.isOpened && (
              <FontAwesomeIcon
                icon="plus"
                size="1x"
                title="More Info"
                color="#606060"
                className="top_box_icon"
              />
            )}
            {this.state.isOpened && (
              <FontAwesomeIcon
                icon="minus"
                size="1x"
                title="Less Info"
                color="#606060"
                className="top_box_icon"
              />
            )}
          </div>
        </div>
        {this.state.isOpened && (
          <div className="expanded_box">
            <div className="box_content">{this.props.biography}</div>

            {this.userType === "Student" &&
              ECStore.requestNotSent(this.props.email) && (
                <div className="link">
                  <FontAwesomeIcon
                    icon="arrow-circle-right"
                    size="1x"
                    title="Send Request"
                    color="#5478e4"
                    className="bottom_box_icon"
                    onClick={this.sendRequest}
                  />
                </div>
              )}
            {this.userType === "Student" &&
              !ECStore.requestNotSent(this.props.email) && (
                <div className="link">
                  <FontAwesomeIcon
                    icon="arrow-circle-right"
                    size="1x"
                    title="Send Request"
                    color="#c0c0c0"
                    className="bottom_box_icon"
                  />
                </div>
              )}
            {!this.userType === "Buddy" && (
              <div className="bottom_icon_bar">
                <FontAwesomeIcon
                  icon="check"
                  size="1x"
                  title="Accept Request"
                  color="green"
                  className="bottom_box_icon"
                  onClick={this.acceptRequest}
                />
                <FontAwesomeIcon
                  icon="times"
                  size="1x"
                  title="Decline Request"
                  color="red"
                  className="bottom_box_icon"
                  onClick={this.denyRequest}
                />
              </div>
            )}
          </div>
        )}
      </li>
    );
  }
}
