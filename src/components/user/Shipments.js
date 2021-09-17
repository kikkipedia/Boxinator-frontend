import Keycloak from "keycloak-js"
import { useEffect, useState } from "react"
import { getAllShipments, getAllUsers, getOrdersByUserId, getShipmentById } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import { Table } from 'react-bootstrap'
import ShipmentModal from "./ShipmentModal"
import userEvent from "@testing-library/user-event"
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

    const parseStatus = (stausAPILink) => {
        const statusString = JSON.stringify(stausAPILink)
        if (statusString === undefined) {
            console.log("Link empty")
            return 'EMPTY'
        } else {
            let sts = statusString.charAt(statusString.length - 2)
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

                    </tr>
                </thead>
                <tbody>
                    {orders && !!orders.length && orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.receiverName}</td>
                            <td style={{ background: order.color }}></td>
                            <td>{order.orderPackage.name}</td>
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
