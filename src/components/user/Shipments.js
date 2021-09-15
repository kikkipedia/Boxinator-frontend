import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getOrdersByUserId } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import OrderCardUser from "./OrderCardUser.js"
import { getAllOrders } from "../../api/API"
import { Table } from 'react-bootstrap'

const Shipments = (props) => {
    const [shipments, setShipments] = useState([])
    const [oldShipments, setOldShipments] = useState([])
    const [inTransit, setInTransit] = useState([])
    const {keycloak} = useKeycloak();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        console.log(props.id)
        getOrdersByUserId(props.id)
        .then(data => {
            console.log(data)
            setShipments(data)
            //sortShipments(data)
            setStatus(data.status)
            //setOrdersNew()
        })
    },[props.id])

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
    

    return(
        <div>
            <h4>All shipments</h4>
            <Table>
                <thead>
                    <tr>
                        <th>Reciever name</th>
                        <th>Box colour</th>
                        <th>Package type</th>
                        <th>Total price</th>
                    </tr>
                </thead>
                <tbody>
                    {shipments && !!shipments.length && shipments.map(shipment => (
                        <tr key={shipment.id}>
                            <td>{shipment.receiverName}</td>
                            <td>{shipment.color}</td>
                            <td>{shipment.orderPackage.name}</td>
                            <td>{shipment.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>



{/*             <h4>Shipments in transit</h4>
            {displayCardOrdersIntransit()}
            <h4>Recieved shipments</h4> */}
        </div>
        
    )
}
export default Shipments;
