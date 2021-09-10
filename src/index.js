import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Keycloak from 'keycloak-js';




ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


    //Get the keycloak configuration
    // let keycloak = Keycloak('./resources/keycloak.json');
    // sessionStorage.setItem('authentication', Keycloak.token);
    //  sessionStorage.setItem('refreshToken', keycloak.refreshToken);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
