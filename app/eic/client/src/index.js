import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
//import './css/stupid.css'
import * as serviceWorker from './serviceWorker';
import Layout from './Layout';


const app = document.getElementById('app');
//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Layout />, app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
