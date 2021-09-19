
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Navbar} from 'react-bootstrap'
import { withKeycloak } from '@react-keycloak/web';
import React from 'react';

const HomeButton = ({keycloak}) => {

    return (
        <div>

            {keycloak && !keycloak.authenticated &&
                <Navbar.Brand style={{"color": "white", "fontWeight": "bold", "fontSize": "25px"}} href="/guest"><img className="navbarImg" src="../resources/images/whiteBox.svg" alt="logo"/> BOXINATOR</Navbar.Brand>
            }

            {keycloak && keycloak.authenticated &&
                <AuthorizedElement roles={['user']}>
                    <Navbar.Brand style={{"color": "white", "fontWeight": "bold", "fontSize": "25px"}} href="/user"><img className="navbarImg" src="../resources/images/whiteBox.svg" alt="logo"/> BOXINATOR</Navbar.Brand>
                </AuthorizedElement>
            }

        </div>

    )

}
export default withKeycloak(HomeButton);