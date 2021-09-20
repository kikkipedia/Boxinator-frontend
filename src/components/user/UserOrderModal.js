import { useState, useEffect } from "react"
import { useKeycloak } from '@react-keycloak/web'
import { Modal, Button, Form } from 'react-bootstrap'
import { createNewOrder, getAllCountries, getPackageTypes, sendOrderInformation } from "../../api/API"
import { propTypes } from "react-bootstrap/esm/Image"

const UserOrderModal = (props) => {
    const { keycloak } = useKeycloak()
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(0)
    const [weight, setWeight] = useState(0)
    const [packages, setPackages] = useState([])
    const [orderPackage, setOrderPackage] = useState({})
    const [country, setCountry] = useState({})

    //for posting to backend
    const [order, setOrder] = useState({
        receiverName: '',
        orderPackage: { id: 0 },
        color: '',
        totalPrice: 0,
        country: { id: 0 },
        user: { id: props.userId }
    })
   
    //modal open/close
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    //fetch & sort countries & packages from database
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

    useEffect(() => {
        for(let p of packages) {
            if(p.id === order.orderPackage.id) {
                setOrderPackage(p)
            }
        }
    }, [order.orderPackage.id])

    useEffect(() => {
        for(let c of countries) {
            if(c.id === order.country.id) {
                setCountry(c)
            }
        }
    }, [order.country.id])

    //calculate total price
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

    useEffect(() => {
        //re-renders when show/close
        setOrder({...order, user: {id: props.userId}})
    },[show])


    const submitOrder = () => {
        try {
            const information = {
                to: keycloak.tokenParsed.preferred_username,
                topic: "Order Information",
                text: "Thank you for your order, your package will be shipped to you as soon as possible!" + "\n\n" + "Details about your order:" + "\n\n" + "Receiver name: " + order.receiverName + "\n" + "Package: " + orderPackage.name + " - " + orderPackage.weight + "KG" + "\n" + 
                "Color: " + order.color + "\n" + "Country: " + country.name + "\n\n" + "Total Price: " + order.totalPrice + " SEK"
                + "\n\n" + "Kind regards," + "\n" + "The Boxinator Team"
            }
            createNewOrder(order)
            sendOrderInformation(information)
        }
        catch(error) {
            console.log(error)
        }
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
                                    countries && countries.map(opt => (
                                        <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <p>Weight: {weight} KG</p>
                        <p>Color: {order.color}</p>
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