
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'

const AdminButton = () => {

    return (
        <div>
            <AuthorizedElement roles={['admin']}>
                <Nav.Link href="/admin">Admin</Nav.Link>
            </AuthorizedElement>

            <AuthorizedElement roles={['user']}>
                <Nav.Link href="/user">User</Nav.Link>
            </AuthorizedElement>
        </div>

    )
    
}
export default AdminButton;