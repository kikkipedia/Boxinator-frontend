import { Card, Table } from "react-bootstrap";
import {  useEffect } from "react";


const OrderCardAdmin = (props) => {
  

    useEffect (()=>{
    },[])
    
    return (
        <Card className="card-container">
            <Card.Header>
                <p>Order ID: {props.orderId}</p>
                <p>Current Status: {props}</p>
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
                    </tr>
                    </tbody>
                </Table>


            </Card.Body>
        </Card>
    );
};
export default OrderCardAdmin;
