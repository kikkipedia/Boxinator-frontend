import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Nav } from 'react-bootstrap'

const ContextButton = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Nav.Link style={{"color": "white", "position": "absolute", "top": "10%" ,"right": "7%" ,"cursor": "pointer", "fontSize": "20px", "fontWeight": "lighter"}} onClick={() => keycloak.login()}>SIGN IN</Nav.Link>
               
            }

            {keycloak && keycloak.authenticated &&
                <Nav.Link style={{"color": "white", "position": "absolute", "top": "10%" ,"right": "7%", "cursor": "pointer", "fontSize": "20px", "fontWeight": "lighter"}}  onClick={() => keycloak.logout()}>LOG OUT</Nav.Link>   
            }

        </div>
    )
}

export default withKeycloak(ContextButton)