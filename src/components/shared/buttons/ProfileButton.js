
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'
import { useKeycloak } from "@react-keycloak/web";


const AdminButton = () => {
  
    
    return (
        <div>
            <AuthorizedElement roles={['admin']} roles={['user']}  >
                <Nav.Link href="/user">Profile</Nav.Link>
            </AuthorizedElement>

        </div>

    )
    
}
export default AdminButton;