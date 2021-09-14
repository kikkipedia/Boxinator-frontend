import { Navbar, Container, Nav } from 'react-bootstrap'
import ContextButton from './buttons/ContextButton'
import HomeButton from './buttons/HomeButton'
import ProfileButton from './buttons/ProfileButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {

    return(
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><FontAwesomeIcon icon={faBoxOpen}/></Navbar.Brand>
                    <HomeButton/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            {/* <UserButton/>
                            <AdminButton/> */}
                            <ProfileButton/>
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