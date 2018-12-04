import React from "react";
import { withRouter } from "react-router-dom";

class ContractEntry extends React.Component {

    constructor() {
        super();
        this.viewContract = this.viewContract.bind(this);
    }

    viewContract() {
        this.props.history.push('/contract/view=' + String(this.props.content._id));
    }

    render() {
        return (
            <div>
                <h6><a onClick={this.viewContract}>{this.props.content.title}</a></h6>
                {this.props.content.description.substring(0, 200) + "..."}
            </div>
        );
    }
}

export default withRouter(ContractEntry);
