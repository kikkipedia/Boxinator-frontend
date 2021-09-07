import { useState, useMemo } from "react"
import { Container, Modal, Button, Form } from 'react-bootstrap'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { createNewOrder } from "../../api/API"

const UserMain = () => {

    const [show, setShow] = useState(false)
    const [country, setCountry] = useState('')
    const [weight, setWeight] = useState(0)
    //to post
    const [name, setName] = useState("")
    const [colour, setColour] = useState("")
    const [price, setPrice] = useState(0)

    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //country list
    // const changeHandler = country => {setCountry(country)}
    // const options = useMemo(() => countryList().getData(), [])


    //TODO -- on component render - fetch user shipments

    //TODO -- calculate price

    const submitOrder = () => {
        const order = ({
            receiverName: name,
            color: colour,
            totalPrice: price
        })
        createNewOrder(order)
    }

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
                            <Form.Control type="text" placeholder="Name of reciever" onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <br/>
                        <Form.Select aria-label="Select weight" onChange={e => setWeight(e.target.value)}>
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
                            onChange={e => setColour(e.target.value)}
                       />
                        </Form.Group>
                        <br/>
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            {/* <Select options={options} value={country} onChange={changeHandler}/> */}
                        </Form.Group> 
                        <Button variant="primary" type="submit" onClick={submitOrder}>Order</Button> 
                    </Form>
                    <br/>
                    <p>Total price: {price} kr</p>
                    <p>Weight: {weight}</p>
                    <p>Colour: {colour}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UserMain