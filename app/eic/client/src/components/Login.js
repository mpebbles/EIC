import React, { Component } from 'react';
import TokenService from './TokenService';
import { GoogleLogin } from 'react-google-oauth'

class Login extends Component {

	constructor() {
		super();
		this.tokenService = new TokenService();
	}

	componentWillMount(){
    	if(this.tokenService.loggedIn()){
        	this.props.history.replace('/');
    	}
	}

    render() {
        return (
        	<div>
        		<center>
		            <div>
		                <h1>
		                    Log In Here
		                </h1>
		            </div>
		            <div>
		            Username: <input type="text" id="user"/>
		            </div>	
		            <div>
						<GoogleLogin onLoginSuccess={this.executeLogin}/>
		            </div>
		        </center>
            </div>
        );
    }

    executeLogin = (response) => {
        const tokenBlob = new Blob([JSON.stringify({access_token: response.getAuthResponse().access_token}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:3000/googleapi/v1/auth/google-login', options).then(r => {
            if(r.ok) {
                const token = r.headers.get('x-auth-token');
                r.json().then(user => {
                    if (token) {
                    	this.tokenService.setToken(token);
                        this.props.history.replace('/');
                    }
                });
            } else {
                if(r.status === 406) {
                    this.props.history.replace('/register');
                }
            }
        })
    };

}

export default Login;