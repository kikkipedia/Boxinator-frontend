import { Table } from "react-bootstrap";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { getAllOrders } from "../../api/API";
import { Container} from 'react-bootstrap'
import OrderCardAdmin from "./OrderCardAdmin.js" 

const AdminHome = () => {
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);

    //Initializes token in session storage
    useEffect(() => {
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        //setOrders(getAllOrders())
        setOrdersNew();
    }, [])

   const  setOrdersNew = async () => {
        const data = await getAllOrders();
        setOrders(data);
    }


    const displayCardOrders = () => {
        let cards = [];
        {orders && orders.length > 0 && orders.map((order) => {
            cards.push(
                <OrderCardAdmin key={order.id}
                                 orderName={order.receiverName}
                                 orderId ={order.id}
                                 orderColor={order.color}
                                 orderTotalPrice ={order.totalPrice}
                                 orderStatus={order.status}
                ></OrderCardAdmin>
            );
        });}
        
        return cards;
    }


    return (
        <Container>
            <div>
                {displayCardOrders()}
            </div>
        </Container>
    )
}

export default AdminHome;
