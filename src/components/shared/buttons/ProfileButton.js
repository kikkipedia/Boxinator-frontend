
import AuthorizedElement from "../../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'
import { useKeycloak } from "@react-keycloak/web";

// const contextRole = () => {
//     if(keycloak.hasRealmRole('admin') && keycloak.hasRealmRole('user')){
//         roles =
//     }

// }



const AdminButton = () => {
    const {keycloak} = useKeycloak();
    
    return (
        <div>
            <AuthorizedElement roles={['admin']} roles={['user']}  >
                <Nav.Link href="/user">Profile</Nav.Link>
            </AuthorizedElement>

            {/* <AuthorizedElement roles={['user']}  >
                <Nav.Link href="/user">User</Nav.Link>
            </AuthorizedElement> */}
        </div>

    )
    
}
export default AdminButton;