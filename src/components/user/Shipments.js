import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getOrdersByUserId } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web';
import OrderCard from "../shared/cards/OrderCard.js" 

const Shipments = (props) => {
    const id = props.userId
    const [shipments, setShipments] = useState([])
    const [oldShipments, setOldShipments] = useState([])
    const [inTransit, setInTransit] = useState([])
    const {keycloak} = useKeycloak();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrdersByUserId(id)
        .then(data => setShipments(data))
        sortShipments()
    },[id])

    const sortShipments = () => {
        console.log("All shipments: " + shipments)
        //sort by shipments status
    }
    const displayCardOrdersIntransit = (status) => {
        let cards = [];
        if(status === "INTRANSIT"){
            {orders && orders.length > 0 && orders.map((order) => {
                cards.push(
                    <OrderCard key={order.id}
                                     orderName={order.receiverName}
                                     orderId ={order.id}
                                     orderColor={order.color}
                                     orderTotalPrice ={order.totalPrice}
                                     orderStatus={order.status}
                    ></OrderCard>
                );
            });}
        }
        return cards;
    }
    const displayCardOrdersReceived = (status) => {
        let cards = [];
        if(status === "RECEIVED"){
            {orders && orders.length > 0 && orders.map((order) => {
                cards.push(
                    <OrderCard key={order.id}
                                     orderName={order.receiverName}
                                     orderId ={order.id}
                                     orderColor={order.color}
                                     orderTotalPrice ={order.totalPrice}
                                     orderStatus={order.status}
                    ></OrderCard>
                );
            });}
        }
        return cards;
    }

    return(
        <div>
            <p>User id: </p>
            <h4>Shipments in transit</h4>
            {displayCardOrdersIntransit()}
            <h4>Recieved shipments</h4>


        </div>
        
    )
}
export default Shipments;
