
import { useState, useEffect } from "react"
import { Modal, Button, Form } from 'react-bootstrap'
import { getAllCountries, getShipmentById, updateCountryMultiplier, updateShipmentStatus } from "../../api/API"

const CountryModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [countries, setCountries] = useState([])
    const [countryIdandName, setCountryIdandName] = useState();
    const [newMultiplier, setNewMultiplier] = useState(0)
    const [newCountryDetails, setNewCountryDetails] = useState({
        id:0,
        name:'',
        multiplier:0
    })

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
        setNewMultiplier(  e.target.value )
        countryIdandName.multiplier = newMultiplier
        
    }
    const handleSubmit = () =>{
        countryIdandName.multiplier = newMultiplier
        updateCountryMultiplier(countryIdandName)
    }

    // const countryBuilder = () =>{
    //     id: parseInt(countryIdandName),
    //     name: ,
    //     multiplier:
    // }

    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="guestNewOrderBtn" onClick={handleShow}>View Status</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>Update Multiplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Select onChange={e => setCountryIdandName( {id: parseInt(e.target.value), name: countries[e.target.value-1].name , multiplier: countries[e.target.value-1].multiplier} )}>
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
                    <div className="orderBtnContainer">
                            <button className="orderBtn" onClick={handleSubmit}>ORDER</button>
                        </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}
export default CountryModal;