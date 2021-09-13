import { Navbar, Container, Nav } from 'react-bootstrap'
import ContextButton from './ContextButton'
import AdminButton from './AdminButton'
import UserButton from './UserButton'

const Navigation = () => {

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/home">BOXINATOR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <UserButton/>
                            <AdminButton/>
                        </Nav>
                        <Nav className="m-auto">

                            <ContextButton/>
                            {/* <Nav.Link href="https://keycloak-boxinator.herokuapp.com/auth/realms/boxinator-app/protocol/openid-connect/logout?redirect_uri=http://localhost:3000/start">Logout</Nav.Link> */}

                        </Nav>                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation;