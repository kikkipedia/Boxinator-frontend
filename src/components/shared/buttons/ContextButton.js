import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';


const Menu = ({ keycloak, keycloakInitialized }) => {

    return (
        <ul>
           

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

        </ul>
    )
}

export default withKeycloak(Menu)