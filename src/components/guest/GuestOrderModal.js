
import { useState, useEffect } from "react"
import {  Modal, Button, Form } from 'react-bootstrap'

import { getAllCountries, getPackageTypes } from  "../../api/API"

const GuestOrderModal = () => {
    const authToken = sessionStorage.getItem("authentication")
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(1)
    const [weight, setWeight] = useState(0)
    const [userEmail, setUserEmail] = useState()
    
    
    //to post
    const [packages, setPackages] = useState([])
    const [userInfo, setUserInfo] = useState()

    const [order, setOrder] = useState({
        userEmail:'',
        receiverName: '',
        orderPackage: {id: 0},
        color: '',
        totalPrice: 0,
        country: {id: 0}
    })

    
    const [userId, setUserId] = useState()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()

  

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
      localStorage.setItem("receiverName", order.receiverName)
      localStorage.setItem("orderPackage", order.orderPackage.id)
      localStorage.setItem("color",order.color)
      localStorage.setItem("totalPrice", order.totalPrice)
      localStorage.setItem("country",order.country.id)
      localStorage.setItem("email", order.userEmail)
    } 

    return (
        <div>
            <button onClick={handleShow}>New order</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="Email Address" onChange={e => setOrder({ ...order, userEmail: e.target.value })} />
                        </Form.Group>
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
        </div>
    )
}
export default GuestOrderModal;