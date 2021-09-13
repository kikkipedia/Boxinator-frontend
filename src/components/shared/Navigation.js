import { Navbar, Container, Nav } from 'react-bootstrap'
import ContextButton from './buttons/ContextButton'
import AdminButton from './buttons/AdminButton'
import UserButton from './buttons/UserButton'
import HomeButton from './buttons/HomeButton'

const Navigation = () => {

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="/home">BOXINATOR</Navbar.Brand> */}
                    <HomeButton/>
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