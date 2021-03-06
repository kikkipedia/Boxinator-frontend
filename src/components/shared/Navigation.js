import { Navbar, Container, Nav } from 'react-bootstrap'
import ContextButton from './buttons/ContextButton'
import HomeButton from './buttons/HomeButton'

const Navigation = () => {

    return(
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <HomeButton/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <ContextButton/>
                        </Nav>                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation;