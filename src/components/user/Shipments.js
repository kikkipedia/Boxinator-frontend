import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getAllShipments, getAllUsers, getOrdersByUserId, getShipmentById } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import { Table } from 'react-bootstrap'

const Shipments = (props) => {
    const [shipments, setShipments] = useState([])
    const [oldShipments, setOldShipments] = useState([])
    const [inTransit, setInTransit] = useState([])
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();
    
    useEffect(() => {
       
        
        getOrdersByUserId(props.id)
            .then(data => {
                // console.log(data)
                setOrders(data)
                console.log(props.id)
            })
            {
                orders && !!orders.length && orders.map(order => (
                    getShipmentById(order.id)
                        .then(data => {
                            setShipments(data)
                        })
                ))
            }
            console.log(shipments.status)
    }, [props.id])


    //Get shipment based upon relevant order id
    useEffect(() => {
        
        {orders && !!orders.length && orders.map(order => (
                getShipmentById(order.id)
                    .then(data => {
                        setShipmentsNew(data)
                    })
            ))
        }
    }, [orders])

    
    useEffect(() => {
        if (orders.length) {
            //after order
        }
    }, [orders])

    const setShipmentsNew = async() => {
        const data = await getAllShipments()
        setShipments(data);
    }

    const parseStatus = (stausAPILink) => {
        if (stausAPILink === undefined) {
            console.log("Link empty")
            return 'EMPTY'
        } else {
            let sts = JSON.stringify(stausAPILink).charAt(JSON.stringify(stausAPILink).length - 2)
            let statusCode = parseInt(sts);
            switch (statusCode) {
                case 1:
                    return 'Created'
                    break;
                case 2:
                    return 'Intransit'
                    break;
                case 3:
                    return 'Received'
                    break;
                case 4:
                    return 'Completed'
                    break;
                case 5:
                    return 'Cancelled'
                    break;
                default:
                    return 'Error'

            }
        }

    }

    return (
        <div className="content">
            <br />
            <Table bordered variant="dark" size="sm" className="orderTable">
                <thead>
                    <tr style={{ color: "#c0eb75" }}>
                        <th>Reciever name</th>
                        <th>Box colour</th>
                        <th>Package type</th>
                        <th>Total price</th>
                        <th>Order status</th>
                        <th>Last updated</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && !!orders.length && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.receiverName}</td>
                            <td style={{ background: order.color }}></td>
                            <td>{order.orderPackage.name}</td>
                            <td>{order.totalPrice}</td>
                            {/* <td>{(getShipmentById(order.id)).status}</td> */}
                            <td>{parseStatus((getShipmentById(order.id)).status)}</td>
                            {/* <td>{parseStatus((getShipmentById(order.id)).status)}</td> */}
                            {/* <td>
                                {shipments && !!shipments.length && shipments.map(shipment => (
                                    parseStatus(shipment.status)
                                ))}
                            </td> */}
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>

    )
}
export default Shipments;
