import React from "react";
import { withRouter } from "react-router-dom";
import * as ContractsActions from "../actions/ContractsActions";
import ContractsStore from "../stores/ContractsStore";
import ContractEntry from "./ContractEntry";
import UserTypeService from "./UserTypeService";

class ContractsContent extends React.Component {
    constructor() {
        super();
        this.getContracts = this.getContracts.bind(this);
        this.newContract = this.newContract.bind(this);
        let userTypeService = new UserTypeService();
        const userType = userTypeService.getUserType();
        this.isCompany = userType === "Company";
        this.state = {
            contracts: []
        };
    }

    componentWillMount() {
        ContractsStore.on("change", this.getContracts);
    }

    componentDidMount() {
        if (ContractsStore.isEmpty()) {
            ContractsActions.loadContracts();
        } else {
            this.getContracts();
        }
    }

    componentWillUnmount() {
        ContractsStore.removeListener("change", this.getContracts);
    }

    getContracts() {
        this.setState({
            contracts: ContractsStore.getAll()
        });
    }

    newContract() {
        this.props.history.push('/contract/create');
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <h3>Contracts</h3>
                    </div>
                    { this.isCompany &&
                    <div>
                        <button onClick={this.newContract}>Create Contract</button>
                    </div> }
                </div>
                <ul>
                    {this.state.contracts.map(contract => (
                        <ContractEntry content={contract} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default withRouter(ContractsContent);
