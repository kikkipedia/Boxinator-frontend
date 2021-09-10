import { withKeycloak } from '@react-keycloak/web';
import React from 'react';


const Menu = ({ keycloak, keycloakInitialized }) => {

    return (
        <ul>
           

            {keycloak && !keycloak.authenticated &&
                <li><a className="btn-link" onClick={() => keycloak.login()}>Login</a></li>
            }

            {keycloak && keycloak.authenticated &&
                <li>
                    <a className="btn-link" onClick={() => keycloak.logout()}>Logout ({
                        keycloak.tokenParsed.preferred_username
                    })</a>
                </li>
            }

        </ul>
    )
}

export default withKeycloak(Menu)