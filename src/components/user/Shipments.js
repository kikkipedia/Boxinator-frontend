import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web'
import { Table } from 'react-bootstrap'
import ShipmentModal from "./ShipmentModal"
import { getOrdersByUserEmail } from "../../api/API"

const Shipments = (props) => {
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);
  
    useEffect(() => {
        //Asynchronously retrieves all orders made by the current user 
        //getOrdersByUserId(props.id)
        getOrdersByUserEmail(keycloak.tokenParsed.email)
            .then(data => {
                setOrders(data)
                console.log("ID " + props.id)
                console.log(data)
              
            })
    },[props.id])

    useEffect(() => {
        if (orders.length) {
            //after order
        }
    }, [orders])

   
    return (
        <div className="content">

            <br/>
            <Table bordered size="sm" className="orderTable">

                <thead>
                    <tr style={{ color: "#c0eb75" }}>
                        <th>Reciever name</th>
                        <th>Box colour</th>
                        <th>Total price</th>
                        <th>Order status</th>

                    </tr>
                </thead>
                <tbody>

                    {orders && !!orders.length && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.receiverName}</td>
                            <td style={{ background: order.color }}></td>
                            <td>{order.totalPrice}</td>
                            <td><ShipmentModal id={order.id} /></td>

                        </tr>
                    ))}

                </tbody>

            </Table>
            <div>

            </div>
        </div>

    )
}
export default Shipments;
