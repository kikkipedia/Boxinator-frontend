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
                    <HomeButton/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <UserButton/>
                            <AdminButton/>
                        </Nav>
                        <Nav className="m-auto">

                            <ContextButton/>
                        </Nav>                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation;