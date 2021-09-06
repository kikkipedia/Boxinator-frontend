import { Navbar, Container, Nav } from 'react-bootstrap'

const Navigation = () => {

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">BOXINATOR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/user">User</Nav.Link>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </Nav>
                        <Nav className="m-auto">
                            <Nav.Link href="https://keycloak-boxinator2.herokuapp.com/auth/realms/boxinator-app/protocol/openid-connect/logout?redirect_uri=http://localhost:3000">Logout</Nav.Link>
                        </Nav>                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation