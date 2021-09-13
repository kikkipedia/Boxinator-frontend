
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import {  Nav } from 'react-bootstrap'

const UserButton = () =>{

    return(
        <AuthorizedElement roles={['user']}>
            <Nav.Link href="/user">User</Nav.Link>
        </AuthorizedElement>
    )

}
export default UserButton;