import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getOrdersByUserId } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web';
import OrderCardUser from "./OrderCardUser.js";
import { getAllOrders } from "../../api/API";

const Shipments = (props) => {
    const id = props.userId
    const [shipments, setShipments] = useState([])
    const [oldShipments, setOldShipments] = useState([])
    const [inTransit, setInTransit] = useState([])
    const {keycloak} = useKeycloak();
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState();

    useEffect(() => {
        getOrdersByUserId(id)
        .then(data => setShipments(data))
        sortShipments()
        setStatus(orders.status)
        setOrdersNew();
        
    },[id])

    const  setOrdersNew = async () => {
        const data = await getAllOrders();
        setOrders(data);
    }

    const sortShipments = () => {
        console.log("All shipments: " + shipments)
        console.log(status)
        //sort by shipments status
    }
    const displayCardOrdersIntransit = () => {
        let cards = [];
       
            {orders && orders.length > 0 && orders.map((order) => {
                cards.push(
                    <OrderCardUser key={order.id}
                                     orderName={order.receiverName}
                                     orderId ={order.id}
                                     orderColor={order.color}
                                     orderTotalPrice ={order.totalPrice}
                                                                    
                    ></OrderCardUser>
                );
            });}
        
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
