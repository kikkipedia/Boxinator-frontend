import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Nav } from 'react-bootstrap'

const Menu = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Nav.Link style={{"color": "white", "cursor": "pointer"}} onClick={() => keycloak.login()}>LOGIN</Nav.Link>
               
            }

            {keycloak && keycloak.authenticated &&
                <Nav.Link style={{"color": "white"}}  onClick={() => keycloak.logout()}>LOGOUT ({
                    keycloak.tokenParsed.preferred_username
                })</Nav.Link>   
            }

        </div>
    )
}

export default withKeycloak(Menu)