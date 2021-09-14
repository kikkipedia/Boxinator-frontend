import { withKeycloak } from '@react-keycloak/web';
import React from 'react';
import { Button } from 'react-bootstrap'

const Menu = ({ keycloak }) => {
    
    return (
        <div>
           
            {keycloak && !keycloak.authenticated &&
                <Button onClick={() => keycloak.login()}>Login</Button>
               
            }

            {keycloak && keycloak.authenticated &&
                <Button onClick={() => keycloak.logout()}>Logout ({
                    keycloak.tokenParsed.preferred_username
                })</Button>
                   
            }

        </div>
    )
}

export default withKeycloak(Menu)