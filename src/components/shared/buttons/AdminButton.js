import { Link } from "react-router-dom"
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Navbar, Container, Nav } from 'react-bootstrap'

const AdminButton = () =>{

    return(
        <AuthorizedElement roles={['admin']}>
            <Nav.Link href="/admin">Admin</Nav.Link>

        </AuthorizedElement>
    )

}
export default AdminButton;