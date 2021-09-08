import React from 'react';
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
let keycloak = Keycloak('./resources/keycloak.json');
console.log(keycloak)

sessionStorage.setItem('authentication', keycloak.token);
      sessionStorage.setItem('refreshToken', "keycloak.refreshToken");
  
//Initialization of the keycloak instance
keycloak.init({ onLoad: 'login-required' }, {mode: 'cors'}).success((authenticated) => {
    
 
   if (!authenticated) {
      window.location.reload();
      //window.location.goBack();
      sessionStorage.setItem('authentication', "keycloak.token");
      sessionStorage.setItem('refreshToken', "keycloak.refreshToken");
   } else {
       console.info("Authenticated");
       sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
   }
   //store authentication tokens in sessionStorage for usage in app
   
 
//to regenerate token on expiry
setTimeout(() => {
       keycloak.updateToken(70).success((refreshed) => {
           if (refreshed) {
               console.debug('Token refreshed' + refreshed);
           } else {
               console.warn('Token not refreshed, valid for '
                   + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
           }
       }).error(() => {
           console.error('Failed to refresh token');
       });
 
 
   }, 60000)
 
}).error(() => {
   console.error("Authenticated Failed");
});


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
