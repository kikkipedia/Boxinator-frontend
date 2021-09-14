import { Table } from "react-bootstrap";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { getAllOrders } from "../../api/API";
import OrderCard from "../shared/cards/OrderCard.js" 





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
        console.log(orders)
        // let ordersArr = [];
        // ordersArr = JSON.parse(orders)
        {orders && orders.length > 0 && orders.map((order) => {
            cards.push(
                <OrderCard key={order.id}
                                 orderName={order.receiverName}
                                 orderId ={order.id}
                                 orderColor={order.color}
                                 orderTotalPrice ={order.totalPrice}
                ></OrderCard>
            );
        });}
        return cards;
    }


    return (
        <div>

            Admin main page
            {/* <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Id</th>
                        <th>receiverName</th>
                        <th>color</th>
                        <th>totalPrice</th>

                    </tr>
                    
                </thead>
                <tbody>
              
                </tbody>
            </Table> */}
            <div>
                {displayCardOrders()}
            </div>
        </div>
    )
}

export default AdminHome;
