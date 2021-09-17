import { Navbar, Container, Nav } from 'react-bootstrap'
import ContextButton from './buttons/ContextButton'
import HomeButton from './buttons/HomeButton'
import ProfileButton from '../user/ProfileModal'

const Navigation = () => {

    return(
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <HomeButton/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            {/* <ProfileButton/> */}
                            <ContextButton/>
                        </Nav>                      
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Navigation;