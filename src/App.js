
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
     setAuthToken(sessionStorage.getItem("authentication")) 
    console.log(authToken + " IN APP.JS")
  }, [authToken])


  return (

    <ReactKeycloakProvider authClient={keycloak} keycloak={keycloak} initConfig={{
      onLoad: 'login-required'}} >
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
