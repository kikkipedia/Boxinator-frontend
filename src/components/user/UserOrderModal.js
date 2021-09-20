import { useState, useEffect } from "react"
import { useKeycloak } from '@react-keycloak/web'
import { Modal, Button, Form } from 'react-bootstrap'
import { createNewOrder, getAllCountries, getPackageTypes } from "../../api/API"

const UserOrderModal = (props) => {
    const { keycloak } = useKeycloak()
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(0)
    const [weight, setWeight] = useState(0)
    const [packages, setPackages] = useState([])

    //Creates a structure for an order object to be submitted to the Database
    const [order, setOrder] = useState({
        receiverName: '',
        orderPackage: {id: 0},
        color: '',
        totalPrice: 0,
        country: 0,
        user: {id: props.userId},
        email: keycloak.tokenParsed.email
    })
   
    //Handles whether or not the Modal is visible based upon a boolean
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    //Fetch & sort countries & packages from the database
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

    //Calculates the total priceof an order based upon the country it will be shipped to and the weight of the package
    useEffect(() => {
        let total = 0
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

    //Initializes the weight of each package type
    useEffect(() => {
        for(let item of packages) {
            if(item.id === order.orderPackage.id) {
                setWeight(item.weight);
            }
        }        
    }, [order.orderPackage.id])

    //Initializes the cost of a package based upon its weight and country multiplier
    useEffect(() => {
        if(weight > 0) {
            const total = (200 + (multiplier * weight))
            setOrder({ ...order, totalPrice: total })
        }
        else {
            setOrder({ ...order, totalPrice: 0 })
        }         
    }, [weight])

    //Re-renders when show/close switch
    useEffect(() => {
        setOrder({...order, user: {id: props.userId}})
    },[show])

    //Submits the new order to the database using a POST request
    const submitOrder = () => {
            try{
                createNewOrder(order)
            }
            catch(err){ console.log(err)}       
    } 


    return (
        <div>
            <Button onClick={handleShow}>NEW ORDER</Button>
            <Modal show={show} onHide={handleClose} className="userOrderModal">
                <Modal.Header closeButton>
                    <Modal.Title style={{"fontWeight": "bold"}}>NEW ORDER</Modal.Title>
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
                                className="colorPicker"
                                type="color"
                                id="colorInput"
                                defaultValue="#F622E3"
                                title="Select a color..."
                                onChange={e => setOrder({ ...order, color: e.target.value })}
                            />
                        </Form.Group>
                       
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Select onChange={e => setOrder({ ...order, country: {id: parseInt(e.target.value)} })}>
                                <option  defaultValue="" disabled selected>Select a country...</option>
                                {
                                    countries.sort((a, b) => a.id - b.id),
                                    countries && countries.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <p>Total price: {!Number.isNaN(order.totalPrice) ? order.totalPrice : 0} SEK</p>
                        <br />
                        <div className="orderBtnContainer">
                            <button type="submit" className="orderBtn" onClick={submitOrder}>ORDER</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default UserOrderModal;