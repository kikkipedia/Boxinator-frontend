import {Card, Table} from "react-bootstrap";
import {useState, useEffect} from "react";



const OrderCard = (props) => {

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
                <tr>
                    <td>{props.orderName}</td>
                    <td>{props.orderColor}</td>
                    <td>{props.orderTotalPrice}</td>
                </tr>
                </Table>
                

            </Card.Body>
        </Card>
    );
};
export default OrderCard;
