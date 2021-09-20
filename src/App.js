
import './App.css'
import { useState, useEffect } from 'react'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import AppRouter from './AppRouter'
import keycloak from './keycloak'


function App() {

  const [authToken, setAuthToken] = useState()

  //Sets AuthToken to be the value of the store JWT
  useEffect(() => {
     setAuthToken(sessionStorage.getItem("authentication")) 
  }, [authToken])


  return (

    <ReactKeycloakProvider authClient={keycloak} keycloak={keycloak}  >
              <AppRouter />
    </ReactKeycloakProvider>

  )
}

export default App;
