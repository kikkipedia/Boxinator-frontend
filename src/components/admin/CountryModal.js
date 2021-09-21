
import { useState, useEffect } from "react"
import { Modal, Form } from 'react-bootstrap'
import { getAllCountries, updateCountryMultiplier } from "../../api/API"

const CountryModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [countries, setCountries] = useState([])
    const [countryIdandName, setCountryIdandName] = useState();
    const [newMultiplier, setNewMultiplier] = useState(0)

    //Asynchronously retrieves all shipments with matching id to the order id
    useEffect(() => {
        getAllCountries()
            .then(data => setCountries(data))
            .catch(error => {
                console.log("Error fetching all data ", error)
            })


    }, [props.id])

    //Handles the changing data from the input menu
    const handleOnChange = async (e) => {
        setNewMultiplier(e.target.value)
        countryIdandName.multiplier = newMultiplier

    }
    //Handles submisson of data on button press
    const handleSubmit = () => {
        try {
            const confirm = window.confirm("Are you sure you want to save changes made?")

            if (confirm) {
                updateCountryMultiplier(countryIdandName)
            }
        }
        catch (err) { console.log(err) }

    }

    //Handles the visibility of the modal based upon a boolean
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="adminUpdateCountryBtn" onClick={handleShow}>UPDATE COUNTRY</button>
            <Modal show={show} onHide={handleClose} className="updateCountryModal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>UPDATE COUNTRY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Select onChange={e => setCountryIdandName({ id: parseInt(e.target.value), name: countries[e.target.value - 1].name, multiplier: countries[e.target.value - 1].multiplier })}>
                            <option defaultValue="" disabled selected>Select a country...</option>

                            {
                                countries.sort((a, b) => a.id - b.id),
                                countries && countries.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))
                            }
                        </Form.Select>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Change Multiplier..." onChange={handleOnChange} />
                        </Form.Group>
                    </Form.Group>
                    <div className="saveBtnContainer">
                        <button className="saveBtn" onClick={handleSubmit}>SAVE</button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}
export default CountryModal;