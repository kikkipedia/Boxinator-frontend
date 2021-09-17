import AuthorizedElement from "../../utilities/AuthorizedElement"
import { Nav } from 'react-bootstrap'
import { useState, useEffect } from "react"
import { useKeycloak } from '@react-keycloak/web'
import { Modal, Button, Form } from 'react-bootstrap'
import { updateUser } from "../../api/API"

const ProfileButton = () => {

    const { keycloak } = useKeycloak()
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({
        id: keycloak.tokenParsed.sid,
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        email: keycloak.tokenParsed.preferred_username,
        dateOfBirth: keycloak.tokenParsed.dob,
        address: keycloak.tokenParsed.address,
        country: keycloak.tokenParsed.countryOfResidence,
        postalCode: keycloak.tokenParsed.postalCode,
        contactNumber: keycloak.tokenParsed.contactNumber
    })

    //modal open/close
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const onClickSaveButton = () => {
        const confirm = window.confirm("Are you sure you want to save all changes made?")

        if (confirm) {
            updateUser(user)
        }
    }

    return (
        <div>
            <AuthorizedElement roles={['user']} >
                <Nav.Link onClick={handleShow}><img className="profileImg" src="../resources/images/user.svg" /></Nav.Link>
                <Modal show={show} onHide={handleClose} className="userEditModal">
                    <Modal.Header closeButton>
                        <Modal.Title style={{"fontWeight": "bold"}}>EDIT YOUR ACCOUNT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label className="editLabel">First name</Form.Label>
                                <Form.Control type="text" value={user.firstName} placeholder="Enter your first name..." onChange={e => setUser({ ...user, firstName: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Last name</Form.Label>
                                <Form.Control type="text" value={user.lastName} placeholder="Enter your last name..." onChange={e => setUser({ ...user, lastName: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">E-mail</Form.Label>
                                <Form.Control type="text" disabled value={user.email} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Date of Birth</Form.Label>
                                <Form.Control className="dateOfBirthField" type="text" value={user.dateOfBirth} placeholder="Date of birth (YYYY-MM-DD)..." onChange={e => setUser({ ...user, dateOfBirth: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Contact Number</Form.Label>
                                <Form.Control type="text" value={user.contactNumber} placeholder="Enter a contact number..." onChange={e => setUser({ ...user, contactNumber: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Country</Form.Label>
                                <Form.Control type="text" value={user.country} placeholder="Enter a country..." onChange={e => setUser({ ...user, country: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Address</Form.Label>
                                <Form.Control type="text" value={user.address} placeholder="Enter your address..." onChange={e => setUser({ ...user, address: e.target.value })} />
                            </Form.Group>
                            <br/>
                            <Form.Group>
                                <Form.Label className="editLabel">Postal Code</Form.Label>
                                <Form.Control type="text" value={user.postalCode} placeholder="Enter your postal code..." onChange={e => setUser({ ...user, postalCode: e.target.value })} />
                            </Form.Group>

                            <div className="saveBtnContainer">
                                <button className="saveBtn" onClick={onClickSaveButton}>SAVE</button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>

            </AuthorizedElement >
        </div >
    )
}
export default ProfileButton