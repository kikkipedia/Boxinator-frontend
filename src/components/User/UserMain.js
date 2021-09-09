import { useState, useEffect } from "react"
import { Container, Modal, Button, Form } from 'react-bootstrap'
import { createNewOrder, getAllCountries, getPackageTypes } from "../../api/API"



const UserMain = () => {

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

    const [userInfo, setUserInfo] = useState()

    //user info from token
    useEffect(() => {
        setUserInfo({
            userName : parseJwt(authToken).preferred_username,
            mail: parseJwt(authToken).email
        })
    },[authToken])

        
    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload)
    }

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

    const sortData = (a, b) => {
        if(a.name < b.name){
            return -1
        }
        else if (a.name > b.name) {
            return 1
        }
        else {
            return 0
        }
    } 

    //calculate price
    useEffect(() => {        
        const total = (200 + (multiplier * weight))
        setPrice(total)
    },[weight, multiplier])

    //TODO -- on component render - fetch user shipments


    //posts order to database
    const submitOrder = () => {
        const order = ({
            receiverName: name,
            color: colour,
            totalPrice: price,
            //git push origin country: countryId
        }) 
        console.log(order)
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
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Name of reciever" onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                        <br/>
                        <Form.Select aria-label="Select weight" onChange={e => setWeight(e.target.value)}>
                            <option>Select package</option>
                            {packages.map(pack => (
                                <option key={pack.id} value={pack.weight}>{pack.name} - {pack.weight}kg</option>
                            ))}
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
                            <Form.Label></Form.Label>
                            <Form.Select aria-label="Select country" onChange={e => setCountryId(e.target.value)}>
                                {countries.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group> 
                        <br/>
                        <Button variant="primary"  onClick={submitOrder}>Order</Button> 
                    </Form>
                    <br/>
                    <p>Total price: {price} kr</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default UserMain