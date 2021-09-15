
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'
import { useKeycloak } from "@react-keycloak/web";


const ProfileButton = () => {
  

    return (
        <div>
            <AuthorizedElement roles={['admin']} roles={['user']}  >
                <Nav.Link style={{"color": "white"}} href="/user">Profile</Nav.Link>
            </AuthorizedElement>

        </div>

    )
    
}
export default ProfileButton;