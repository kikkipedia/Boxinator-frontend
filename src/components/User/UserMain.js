import { useState, useMemo, useRef } from "react"
import { Container, Modal, Button, Form } from 'react-bootstrap'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { createNewOrder, fetchUser } from "../../api/userApi"

const UserMain = () => {

    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    const [country, setCountry] = useState('')


    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //country list
    const changeHandler = country => {setCountry(country)}
    const options = useMemo(() => countryList().getData(), [])

    //converts rgb to hex
    const rgbToHex = (r, g, b) => {
        const hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        return hex
    }



    //TODO -- on component render - fetch user shipments

    //TODO -- calculate price



    return (
        <Container>
            <h4>Shipments</h4>
            <hr/>
            <h5>Shipments under way</h5>
            <p>(Fetch orders in progress)</p>
            <hr/>
            <h5>Completed shipments</h5>
            <p>(Fetch complete orders)</p>
            <hr/>
            <button onClick={handleShow}>New shipment</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New shipment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Reciever</Form.Label>
                            <Form.Control type="text" placeholder="Name of reciever"/>
                        </Form.Group>
                        <br/>
                        <Form.Select aria-label="Select weight">
                            <option>Select weight</option>
                            <option value="1">Basic 1kg</option>
                            <option value="2">Humble 2kg</option>
                            <option value="5">Deluxe 5kg</option>
                            <option value="8">Premium 8kg</option>
                        </Form.Select>
                        <br/>
                        <Form.Group>
                        <Form.Label htmlFor="colorInput">Box colour</Form.Label>
                        <Form.Control
                            type="color"
                            id="coloInput"
                            defaultValue="#F622E3"
                            title="Choose your colour"
                       />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Select options={options} value={country} onChange={changeHandler}/>
                        </Form.Group> 
                        <Button variant="primary" type="submit">Order</Button> 
                    </Form>
                    <br/>
                    <p>Total price: {/* {price}  */}kr</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UserMain