import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Nav } from 'react-bootstrap'

const ContextButton = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Nav.Link style={{"color": "white", "marginLeft": "1000px", "cursor": "pointer", "fontSize": "20px"}} onClick={() => keycloak.login()}>LOGIN</Nav.Link>
               
            }

            {keycloak && keycloak.authenticated &&
                <Nav.Link style={{"color": "white"}}  onClick={() => keycloak.logout()}>LOGOUT ({
                    keycloak.tokenParsed.preferred_username
                })</Nav.Link>   
            }

        </div>
    )
}

export default withKeycloak(ContextButton)