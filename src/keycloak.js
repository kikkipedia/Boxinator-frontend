import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'https://keycloak-boxinator.herokuapp.com/auth', 
  realm: 'boxinator-app', 
  clientId: 'boxinator-frontend',
  
}

const keycloak = new Keycloak(keycloakConfig);
export default keycloak