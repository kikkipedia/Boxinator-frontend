
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Navbar} from 'react-bootstrap'
import { withKeycloak } from '@react-keycloak/web';
import React from 'react';

const HomeButton = ({ keycloak}) => {

    return (
        <div>

            {keycloak && !keycloak.authenticated &&
                <Navbar.Brand href="/homeGuest">BOXINATOR</Navbar.Brand>
            }

            {keycloak && keycloak.authenticated &&
                <AuthorizedElement roles={['user']}>
                    <Navbar.Brand href="/home">BOXINATOR</Navbar.Brand>
                </AuthorizedElement>
            }

        </div>

    )

}
export default withKeycloak(HomeButton);