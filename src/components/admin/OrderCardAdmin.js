import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import {  getShipmentStatusHistoryByShipmentId, updateShipment, getAllOrders, createNewOrder, createNewShipment, getShipmentById } from "../../api/API";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";



const OrderCardAdmin = (props) => {
    const [newShipment, setNewShipment] = useState();
    

    useEffect (()=>{
        console.log(newShipment)
    },[])
    
    return (
        <Card className="card-container">
            <Card.Header>
                <p>Order ID: {props.orderId}</p>
            </Card.Header>

            <Card.Body>
                <Table>
                    <thead>
                        <tr>

                            <th>Receiver Name</th>
                            <th>Color</th>
                            <th>Total Price</th>
                        
                        </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>{props.orderName}</td>
                        <td>{props.orderColor}</td>
                        <td>{props.orderTotalPrice}</td>
                        <td>
                            {/* {displayCardStatus()} */}
                        </td>
                    </tr>
                    </tbody>
                </Table>


            </Card.Body>
        </Card>
    );
};
export default OrderCardAdmin;
