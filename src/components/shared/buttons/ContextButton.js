import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navbar } from 'react-bootstrap'
import { useHistory } from 'react-router';



const Menu = ({ keycloak }) => {
    const history = useHistory();

    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Navbar.Brand onClick={() => keycloak.login()}>Login</Navbar.Brand>
               

            }

            {keycloak && keycloak.authenticated &&
                <Navbar.Brand href="/homeGuest" onClick={() => keycloak.logout()}>Logout ({
                    keycloak.tokenParsed.preferred_username
                })</Navbar.Brand>
                   
                
            }

        </div>
    )
}

export default withKeycloak(Menu)