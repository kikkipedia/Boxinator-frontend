import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { getAllOrders, getAllShipments } from "../../api/API";
import OrderCardAdmin from "./OrderCardAdmin.js"
import StatusChanger from "./StatusChanger";

const AdminHome = () => {
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);
    const [shipments, setShipments] = useState([]);
    //Initializes token in session storage
    useEffect(() => {
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        setOrdersNew();
        setShipmentsNew();
    }, [])

    const setOrdersNew = async () => {
        const data = await getAllOrders();
        setOrders(data);
    }
    const setShipmentsNew = async () => {
        const data = await getAllShipments();
        setShipments(data);
    }
    const displayCardStatus = () => {
        let cards = [];
        {
            shipments && shipments.length > 0 && shipments.map((shipment) => {
                cards.push(
                    <StatusChanger key={shipment.id}
                        orderId={shipment.id}
                        orderStatus={shipment.status.statusType}
                    ></StatusChanger>
                );
            });
        }

        return cards;
    }
    const displayCardOrders = () => {
        let cards = [];
        {
            orders && orders.length > 0 && orders.map((order) => {
                cards.push(
                    <OrderCardAdmin key={order.id}
                        orderName={order.receiverName}
                        orderId={order.id}
                        orderColor={order.color}
                        orderTotalPrice={order.totalPrice}>
                    </OrderCardAdmin>
                    
                );
            });
        }
        return cards;
    }



    return (
        <div>
            <div>
                {/* {displayCardOrders()} */}
                {displayCardStatus()}
                
            </div>
        </div>
    )
}

export default AdminHome;
