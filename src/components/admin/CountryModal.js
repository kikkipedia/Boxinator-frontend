
import { useState, useEffect } from "react"
import { Modal, Button, Form } from 'react-bootstrap'
import { getShipmentById, updateCountryMultiplier, updateShipmentStatus } from "../../api/API"

const CountryModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(0)

    //Asynchronously retrieves all shipments with matching id to the order id
    useEffect(() => {
        getAllCountries()
            .then(data => setCountries(data))
            .catch(error => {
                console.log("Error fetching all data ", error)
            })


    }, [props.id])

    //Handles the change to cancelled by user 
    const handleOnChange = async (e) => {
        e => setMultiplier({...country, multiplier: e.target.value })
        updateCountryMultiplier(e)
    }



    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="guestNewOrderBtn" onClick={handleShow}>View Status</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>View Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Select onChange={e => setOrder({ ...order, country: { id: parseInt(e.target.value) } })}>
                            <option defaultValue="" disabled selected>Select a country...</option>
                            {
                                countries && countries.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))
                            }
                        </Form.Select>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Change Multiplier" onChange={handleOnChange} />
                        </Form.Group>
                    </Form.Group>

                </Modal.Body>

            </Modal>
        </div>
    )
}
export default CountryModal;