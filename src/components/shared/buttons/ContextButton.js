import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navbar } from 'react-bootstrap'



const Menu = ({ keycloak }) => {

    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                // <a className="btn-link" onClick={() => keycloak.login()}>Login</a>
                <Navbar.Brand onClick={() => keycloak.login()}>Login</Navbar.Brand>
            }

            {keycloak && keycloak.authenticated &&
                <Navbar.Brand href="/homeGuest" onClick={() => keycloak.logout()}>Logout ({
                    keycloak.tokenParsed.preferred_username
                })</Navbar.Brand>
                    // <a className="btn-link" onClick={() => keycloak.logout()}>Logout </a>
                
            }

        </div>
    )
}

export default withKeycloak(Menu)