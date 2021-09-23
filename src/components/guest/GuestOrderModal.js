import { useState, useEffect } from "react"
import { Modal, Form } from 'react-bootstrap'
import { getAllCountries, getPackageTypes, createNewOrder, sendOrderInformation } from "../../api/API"

const GuestOrderModal = () => {
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(0)
    const [weight, setWeight] = useState(0)
    const [orderPackage, setOrderPackage] = useState({})
    const [country, setCountry] = useState({})
    //to post
    const [packages, setPackages] = useState([])
    //Creates a structure for an order object to be submitted to the Database
    const [order, setOrder] = useState({
        email: "",
        receiverName: '',
        orderPackage: { id: 0 },
        color: '#',
        totalPrice: 0,
        country: { id: 0 }
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

    //calculate price
    useEffect(() => {
        let total = 0;
        for (let item of countries) {
            if (item.id === order.country.id) {
                if (weight > 0) {
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
        for (let item of packages) {
            if (item.id === order.orderPackage.id) {
                setWeight(item.weight);
            }
        }
    }, [order.orderPackage.id])
    //Initializes the cost of a package based upon its weight and country multiplier
    useEffect(() => {
        if (weight > 0) {
            const total = (200 + (multiplier * weight))
            setOrder({ ...order, totalPrice: total })
        }
        else {
            setOrder({ ...order, totalPrice: 0 })
        }
    }, [weight])

    const submitOrder = () => {
        try {
            const information = {
                to: order.email,
                topic: "Order Information",
                text: "Thank you for your order, your package will be shipped to you as soon as possible!" + "\n\n" + "Details about your order:" + "\n\n" + "Receiver name: " + order.receiverName + "\n" + "Package: " + orderPackage.name + " - " + orderPackage.weight + "KG" + "\n" + 
                "Color: " + order.color + "\n" + "Country: " + country.name + "\n\n" + "Total Price: " + order.totalPrice + " SEK" + "\n\n" +
                "Please register now to be able to follow and handle your order! Follow this link: " + "https://keycloak-boxinator.herokuapp.com/auth/realms/boxinator-app/login-actions/registration?client_id=boxinator-frontend"  
                + "\n\n" + "Kind regards," + "\n" + "The Boxinator Team"
            }
            sendOrderInformation(information)
            createNewOrder(order)
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <div>
            <button className="guestNewOrderBtn" onClick={handleShow}>NEW ORDER</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{"fontWeight": "bold"}}>NEW ORDER</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form><Form.Group>
                        <Form.Label></Form.Label>
                        <Form.Control className="orderInput" type="text" placeholder="Email address..." onChange={e => setOrder({ ...order, email: e.target.value })} />
                    </Form.Group>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control className="orderInput" type="text" placeholder="Name of receiver..." onChange={e => setOrder({ ...order, receiverName: e.target.value })} />
                        </Form.Group>
                        <br />
                        <Form.Select className="orderInput" aria-label="Select package..." onChange={e => setOrder({ ...order, orderPackage: { id: parseInt(e.target.value) } })}>
                            <option defaultValue="" disabled selected>Select a package...</option>
                            {
                                packages && packages.map(pack => (
                                    <option className="orderInput" key={pack.id} value={pack.id}>{pack.name} - {pack.weight} KG</option>
                                ))
                            }
                        </Form.Select>
                        <br />
                        <Form.Group>
                            <Form.Label htmlFor="colorInput">Package color</Form.Label>
                            <Form.Control
                                className="colorPicker"
                                type="color"
                                id="colorInput"
                                defaultValue="#F622E3"
                                title="Select a color..."
                                onChange={e => setOrder({ ...order, color: e.target.value })}
                            />
                        </Form.Group>
                        <br />
                        <Form.Group>
                            <Form.Select className="orderInput" onChange={e => setOrder({ ...order, country: { id: parseInt(e.target.value) } })}>
                                <option defaultValue="" disabled selected>Select a country...</option>
                                {
                                    countries.sort((a, b) => a.id - b.id),
                                    countries && countries.map(opt => (
                                        <option className="orderInput" key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <br />
                        <p className="orderInput"><span className="labelWord">Weight: </span>{weight} KG</p>
                        <p className="orderInput"><span className="labelWord">Color: </span>{order.color}</p>
                        <p className="orderInput"><span className="labelWord">Total Price: </span>{!Number.isNaN(order.totalPrice) ? order.totalPrice : 0} SEK</p>
                        <br />
                        <div className="orderBtnContainer">
                            <button className="orderBtn" onClick={submitOrder}>ORDER</button>
                        </div>

                    </Form>
                </Modal.Body>
                
            </Modal>
        </div>
    )
}
export default GuestOrderModal;