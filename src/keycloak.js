import Keycloak from 'keycloak-js'
const keycloakConfig = {
  url: 'https://keycloak-boxinator.herokuapp.com/auth', 
  realm: 'boxinator-app', 
  clientId: 'boxinator-frontend',
  
}

const keycloak2 = new Keycloak(keycloakConfig);
export default keycloak2