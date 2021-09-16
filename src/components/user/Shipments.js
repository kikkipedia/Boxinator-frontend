import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getOrdersByUserId, getShipmentById } from "../../api/API"
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
                     
    },[props.id])

    useEffect(() => {
        if (orders.length) {
            //after order
        }
    }, [orders])

    //Get shipment based upon relevant order id
    useEffect(() => {
        {orders && !!orders.length && orders.map(order => (
            getShipmentById(order.id)
                .then(data => {
                setShipments(data)
                console.log(shipments)
                })
        ))
    }   
    },[orders])



    // const  setOrdersNew = async () => {
    //     const data = await getAllOrders();
    //     setOrders(data);
    // }

    // const sortShipments = () => {
    //     console.log("All shipments: " + shipments)
    //     console.log(status)
    //     //sort by shipments status
    // }
    // const displayCardOrdersIntransit = () => {
    //     let cards = [];

    //         {orders && orders.length > 0 && orders.map((order) => {
    //             cards.push(
    //                 <OrderCardUser key={order.id}
    //                                  orderName={order.receiverName}
    //                                  orderId ={order.id}
    //                                  orderColor={order.color}
    //                                  orderTotalPrice ={order.totalPrice}

    //                 ></OrderCardUser>
    //             )
    //         })}

    //     return cards;
    // }


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
                            {/* <td>{getShipmentById(order.id).shipments.status.statusType}</td> */}
                            <td>
                                {shipments && !!shipments.length && shipments.map(shipment => (
                                    <tr key={shipment.id}>
                                        <td></td>
                                        <td>{shipment.status.statusType}</td>
                                        {/* <td>{shipment.shipmentStatusHistory.timestamp}</td> */}
                                    </tr>
                                ))}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
        </div>

    )
}
export default Shipments;
