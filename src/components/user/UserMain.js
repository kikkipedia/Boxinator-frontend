import { useState, useEffect } from "react"
import { Container, Modal, Button, Form } from 'react-bootstrap'
import { createNewOrder, getAllCountries, getAllUsers, getPackageTypes, postNewUser } from "../../api/API"
import Shipments from "./Shipments"


const UserMain = () => {

    const authToken = sessionStorage.getItem("authentication")
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(1)
    const [weight, setWeight] = useState(0)
    
    //to post
    const [packages, setPackages] = useState([])
    const [userInfo, setUserInfo] = useState()

    const [order, setOrder] = useState({
        receiverName: '',
        orderPackage: {id: 0},
        color: '',
        totalPrice: 0,
        country: {id: 0}
    })

    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()

    //user email from token
    useEffect(() => {
        setUserEmail(parseJwt(authToken).email)
        const fetchUsers = async() => {
            try {
                await getAllUsers()
                .then(data => setUsers(data))
            }
            catch(error) {console.log(error)}
        }
        fetchUsers()       
    },[authToken, userEmail])

    useEffect(() => {
        getUserByEmail()
    },[users])

    //save if new user, or else fetch user 
    const getUserByEmail = () => {      
        let foundUser = users.find(element => element.email === userEmail)
        setUser(foundUser)             
    }

    useEffect(() => {
        if(user === undefined) {
            const post = {
                email: userEmail,
                role: 1
            }
            postNewUser(post)
            .then(data => setUserId(data.id))
        }
        else {
            setUserId(user.id)
            console.log("user already exists: " + userId)
        }
    },[user])
        
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

        getAllCountries()
            .then(data => setCountries(data))
            .catch(error => {
                console.log("Error fetching all data ", error)
            })

        getPackageTypes()
            .then(data => setPackages(data))
            .catch(error => {
                console.log("Error fetching all data ", error)
            })

    }, [])

    const sortData = (a, b) => {
        if (a.name < b.name) {
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
        let total = 0;
        for (let item of countries) {
            if (item.id === order.country.id) {
                if(weight > 0) {
                    total = (200 + (item.multiplier * weight))
                    setMultiplier(item.multiplier)
                    setOrder({ ...order, totalPrice: total })
                }
                else {
                    setMultiplier(item.multiplier)
                    setOrder({ ...order, totalPrice: 0 })
                }        
            }
        }
        setOrder({ ...order, totalPrice: total })
    }, [order.country.id])

    useEffect(() => {
        for(let item of packages) {
            if(item.id === order.orderPackage.id) {
                setWeight(item.weight);
            }
        }        
    }, [order.orderPackage.id])

    useEffect(() => {
        if(weight > 0) {
            const total = (200 + (multiplier * weight))
            setOrder({ ...order, totalPrice: total })
        }
        else {
            setOrder({ ...order, totalPrice: 0 })
        }         
    }, [weight])

    //TODO -- on component render - fetch user shipments
    //posts order to database
    const submitOrder = () => {
        createNewOrder(order)
    } 

    return (
        <Container>
            {/* if userId is present */}
            {userId > 0 && <Shipments userId={userId} /> }
            <hr />
            <button onClick={handleShow}>New order</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Name of receiver" onChange={e => setOrder({ ...order, receiverName: e.target.value })} />
                        </Form.Group>
                        <br />
                        <Form.Select aria-label="Select package..." onChange={e => setOrder({ ...order, orderPackage: {id: parseInt(e.target.value)} })}>
                            <option defaultValue="" disabled selected>Select a package...</option>
                            {
                                packages && packages.map(pack => (
                                    <option key={pack.id} value={pack.id}>{pack.name} - {pack.weight} KG</option>
                                ))
                            }
                        </Form.Select>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="colorInput">Box color</Form.Label>
                            <Form.Control
                                type="color"
                                id="colorInput"
                                defaultValue="#F622E3"
                                title="Select a color..."
                                onChange={e => setOrder({ ...order, color: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Select onChange={e => setOrder({ ...order, country: {id: parseInt(e.target.value)} })}>
                                <option  defaultValue="" disabled selected>Select a country...</option>
                                {
                                    countries && countries.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <Button variant="primary" onClick={submitOrder}>Order</Button>
                    </Form>
                    <br />
                    <p>Weight: {weight} KG</p>
                    <p>Color: {order.color}</p>
                    <p>Total price: {!Number.isNaN(order.totalPrice) ? order.totalPrice : 0} SEK</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
export default UserMain