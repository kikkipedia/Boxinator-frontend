import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navbar } from 'react-bootstrap'

const Menu = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Navbar.Brand style={{"color": "white", "margin-left": "1000px", "cursor": "pointer"}} onClick={() => keycloak.login()}>LOGIN</Navbar.Brand>
               
            }

            {keycloak && keycloak.authenticated &&
                <Navbar.Brand style={{"color": "white"}}  onClick={() => keycloak.logout()}>LOGOUT ({
                    keycloak.tokenParsed.preferred_username
                })</Navbar.Brand>   
            }

        </div>
    )
}

export default withKeycloak(Menu)