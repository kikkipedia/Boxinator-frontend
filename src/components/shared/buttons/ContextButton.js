import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Navbar } from 'react-bootstrap'

<<<<<<< HEAD
=======

>>>>>>> daniel5
const Menu = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Navbar.Brand onClick={() => keycloak.login()}>Login</Navbar.Brand>
               
            }

            {keycloak && keycloak.authenticated &&
<<<<<<< HEAD
                <Navbar.Brand href="/guest" onClick={() => keycloak.logout()}>Logout ({
=======
                <Navbar.Brand onClick={() => keycloak.logout()}>Logout ({
>>>>>>> daniel5
                    keycloak.tokenParsed.preferred_username
                })</Navbar.Brand>
                   
            }

        </div>
    )
}

export default withKeycloak(Menu)