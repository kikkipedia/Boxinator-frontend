import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCog } from "@fortawesome/free-solid-svg-icons"

const ProfileButton = () => {
  

    return (
        <div>
            <AuthorizedElement /* roles={['admin']}  */roles={['user']}  >
                <Nav.Link style={{"color": "white"}} href="/profile">Profile <FontAwesomeIcon icon={faUserCog} /> </Nav.Link>
            </AuthorizedElement>

        </div>

    )
    
}
export default ProfileButton