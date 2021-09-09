
import './App.css'
import { useState, useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Navigation from './components/shared/Navigation'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import AppRouter from './AppRouter'
import keycloak from './keycloak'
import Keycloak from 'keycloak-js';

function App() {

  const [authToken, setAuthToken] = useState()

  //sets user info
  useEffect(() => {
    
      let keycloak = Keycloak('./resources/keycloak.json');

      //if (window.location.pathname !== "/start" ) {
          //Initialization of the keycloak instance
          keycloak.init({ onLoad: 'login-required' }, { mode: 'cors' }).success((authenticated) => {
      
      
              if (!authenticated) {
                window.location.reload();
                  console.log("RELOAD")
                  //window.location.goBack();
      
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
      //}
     //setAuthToken(sessionStorage.getItem("authentication"))
    
    
    //console.log(authToken + " IN APP.JS")
  }, [])

  return (

    <ReactKeycloakProvider authClient={keycloak} keycloak={keycloak} >
      {/* <BrowserRouter> */}
        <Navigation />
        {/* <Switch> */}
          <AppRouter />
          {/* <Route exact path="/" component={Home}/>
        <Route exact path="/start" component={Start}/>
        <Route path="/user" component={UserMain}/>
        <Route path="/admin" component={AdminMain}/> */}
          {/* <Route path="/shipments" exact component={shipments}></Route>
          <Route path="/adminsettings" exact component={adminsettings}></Route> */}

        {/* </Switch> */}
      {/* </BrowserRouter> */}
    </ReactKeycloakProvider>

  )
}

export default App;
