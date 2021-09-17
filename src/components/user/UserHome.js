import { useState, useEffect } from "react"
import { Redirect } from "react-router";
import { Container, Modal, Button, Form} from 'react-bootstrap'
import { getAllOrders, getAllUsers, postNewUser, createNewOrder, getAllCountries, getPackageTypes, getAllShipments } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import Shipments from "./Shipments"

const UserHome = () => {

    const {keycloak} = useKeycloak()
    const [userEmail, setUserEmail] = useState(keycloak.tokenParsed.email)
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false)
    const [shipments, setShipments] = useState([])
    //modal
    const [show, setShow] = useState(false)
    const [countries, setCountries] = useState([])
    const [multiplier, setMultiplier] = useState(0)
    const [weight, setWeight] = useState(0)
    const [packages, setPackages] = useState([])
    //for posting to backend
    const [order, setOrder] = useState({
        receiverName: '',
        orderPackage: {id: 0},
        color: '',
        totalPrice: 0,
        email: {id: userEmail},
        country: {id: 0},
        user: {id: userId}
    })

    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken) 
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true)
        }
        else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
            setShouldRedirectAdmin(true)
        }        
    },[])

    //user email from token & redirects if admin
    useEffect(()=>{
        getAllOrders()
        setUserEmail(keycloak.tokenParsed.email) 
       if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin' ){
              setShouldRedirectAdmin(true);
      }
    },[])

    useEffect(() => {
        //userId changes
    },[userId])

    //fetch all users
    useEffect(() => {
        getAllUsers()
        .then(data => {
            setUsers(data)
            //check if user exists
            let user = data.find(el => el.email === userEmail)
            if(!user) {
                //if not - post new user to database
                if (userEmail !== undefined) {
                    const reqParams = {

                        email: keycloak.tokenParsed.email,
                    
                    }
                    console.log(reqParams)
                    postNewUser(reqParams)
                   
                }
                else{console.log("cant find email")}
            }
            else {
                setUserId(keycloak.tokenParsed.sid)
                console.log("user exists: ", user.email, userId)
               
            }
        })
    },[userEmail])

    useEffect(() => {
        if(users.length) {
            //if new user is saved // array changes => re-render
        }
    },[users])

    // const setShipmentsNew = async() => {
    //     const data = await getAllShipments()
    //     setShipments(data);
    // }

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
         getAllShipments()
            .then(data => setShipments(data))   
    }, [])

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
        setOrder({...order,user: {id: userId}})
        console.log(order)
    },[show])


    const submitOrder = () => {
        createNewOrder(order)
        console.log(order)
    } 

    return (        
        <div className="content">
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

            <Button onClick={handleShow}>New order</Button>
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
                        <Button variant="primary" type="submit "onClick={submitOrder}>Order</Button>
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
            <br/>
            <h4>All user shipments</h4>
            <Shipments id={userEmail}/>
            
        </div>
    )
}
export default UserHome

