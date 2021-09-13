
import { useState, useEffect } from "react"
import { Container, Modal, Button, Form } from 'react-bootstrap'

import { createNewOrder, getAllCountries, getAllUsers, getPackageTypes, postNewUser } from  "../../../api/API"

const OrderModal = () => {

    const authToken = sessionStorage.getItem("authentication")
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [weight, setWeight] = useState(0)

    const [countryId, setCountryId] = useState()
    const [multiplier, setMultiplier] = useState()
    //to post
    const [name, setName] = useState('')
    const [colour, setColour] = useState('')
    const [price, setPrice] = useState(0)
    const [packages, setPackages] = useState([])

    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [users, setUsers] = useState([])


    // //save if new user, or else fetch user 
    // const fetchUser = () => {
    //     getAllUsers()
    //     .then(data => setUsers(data))
    //     //search for user email in user table
    //     let user = users.find(el => el.email === userEmail)
    //     if (user === undefined) {
    //         //TODO - post new user
    //         console.log("User not found. Email: " + userEmail)
    //         const post = ({
    //             email: userEmail
    //         })
    //         console.log(post)
    //         postNewUser(post)
    //         //TODO - then get the id!
    //     }
    //     else {
    //         setUserId(user.id)
    //         console.log(user)
    //     }
    // }
        

    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    //fetch & sort countries from database
    useEffect(() => {
        try {
            getAllCountries()
            //.then(data => data.sort(sortData))
            .then(data => setCountries(data))
            setMultiplier(countries[countryId - 1].multiplier)
        }
        catch(err) {
            console.log(err)
        }
    },[countryId])

    useEffect(() => {
        try {
            getPackageTypes()
            //.then(data => data.sort(sortData))
            .then(data => setPackages(data))
        }
        catch(err) {
            console.log(err)
        }
    },[])


    //calculate price
    useEffect(() => {        
        const total = (200 + (multiplier * weight))
        setPrice(total)
    },[weight, multiplier])

    //posts order to database
    const submitOrder = () => {
        const order = ({
            receiverName: name,
            color: colour,
            totalPrice: price,
            //country: countryId
        }) 
        console.log(order)
        createNewOrder(order)           

    }

    return (
        <div>
            <button onClick={handleShow}>New shipment</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New shipment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>

                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Name of reciever" onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Select aria-label="Select weight" onChange={e => setWeight(e.target.value)}>
                            <option>Select package</option>
                            {packages.map(pack => (
                                <option key={pack.id} value={pack.weight}>{pack.name} - {pack.weight}kg</option>
                            ))}
                        </Form.Select>
                        <br />

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
                        <br />
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Select aria-label="Select country" onChange={e => setCountryId(e.target.value)}>
                                {countries.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Button variant="primary" onClick={submitOrder}>Order</Button>
                    </Form>
                    <br />
                    <p>Total price: {price} kr</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default OrderModal;