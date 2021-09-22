import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web'
import { Table } from 'react-bootstrap'
import ShipmentModal from "./ShipmentModal"
import { getOrdersByUserEmail } from "../../api/API"

const Shipments = (props) => {
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);
  
    //Asynchronously retrieves all orders made by the current user 
    useEffect(() => {
            getOrdersByUserEmail(keycloak.tokenParsed.email)
            .then(data => {
                setOrders(data)              
            })
    },[props.id])

    useEffect(() => {
        if (orders.length) {
        }
    }, [orders])

   
    return (
        <div className="content">

            <Table bordered size="sm" className="orderTable">

                <thead style={{"backgroundColor": "#212529", "color": "white"}}>
                    <tr>
                        <th style={{"padding": "10px", "borderTopLeftRadius": "10px"}}>RECEIVER NAME</th>
                        <th style={{"padding": "10px"}}>COLOR</th>
                        <th style={{"padding": "10px"}}>TOTAL PRICE</th>
                        <th style={{"padding": "10px", "borderTopRightRadius": "10px"}}>CURRENT STATUS</th>

                    </tr>
                </thead>
                <tbody style={{"fontSize": "18px"}}>

                    {orders && !!orders.length && orders.map(order => (
                        <tr key={order.id}>
                            <td style={{"padding": "10px", "fontWeight": "lighter"}}>{order.receiverName}</td>
                            <td style={{ background: order.color}}></td>
                            <td style={{"padding": "10px", "fontWeight": "lighter"}}>{order.totalPrice} SEK</td>
                            <td style={{"padding": "10px", "fontWeight": "lighter"}}><ShipmentModal id={order.id} /></td>

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
