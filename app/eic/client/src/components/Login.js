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
						<GoogleLogin onLoginSuccess={this.executeLogin} onLoginFailure={this.onFailure}/>
		            </div>
		        </center>
            </div>
        );
    }

    executeLogin = (response) => {
    	console.log("Successfully logged in with JWT", response.getAuthResponse().access_token);
        const tokenBlob = new Blob([JSON.stringify({access_token: response.getAuthResponse().access_token}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:3000/googleapi/v1/auth/google', options).then(r => {
            const token = r.headers.get('x-auth-token');
            r.json().then(user => {
                if (token) {
                	this.tokenService.setToken(token);
                    this.props.history.replace('/');
                }
            });
        })
    };

    onFailure = (error) => {
      alert(error);
    }

}

export default Login;