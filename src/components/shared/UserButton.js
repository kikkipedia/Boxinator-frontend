import { Link } from "react-router-dom"
import AuthorizedElement from "../../utilities/AuthorizedElement"
import { Navbar, Container, Nav } from 'react-bootstrap'

const AdminButton = () =>{

    return(
        <AuthorizedElement roles={['user']}>
            <Nav.Link href="/user">User</Nav.Link>

        </AuthorizedElement>
    )

}
export default AdminButton;