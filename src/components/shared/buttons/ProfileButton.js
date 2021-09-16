import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'

const ProfileButton = () => {


    return (
        <div>
            <AuthorizedElement roles={['user']}  >
                <Nav.Link href="/profile"><img className="profileImg" src="../resources/images/user.svg" /></Nav.Link>
            </AuthorizedElement>
        </div>
    )
}
export default ProfileButton