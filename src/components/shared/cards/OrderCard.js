import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";



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
                            <th>Status</th>

                        </tr>

                    </thead>
                    <tr>
                        <td>{props.orderName}</td>
                        <td>{props.orderColor}</td>
                        <td>{props.orderTotalPrice}</td>
                        <td>
                                 {/* onChange={e => setOrder({ ...order, country: {id: parseInt(e.target.value)} })} */}
                                <select  class="form-select" aria-label="Default select example">
                                <option value="CREATED">Created</option>
                                <option value="RECEIVED">Received</option>
                                <option value="INTRANSIT">Intransit</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                </Table>


            </Card.Body>
        </Card>
    );
};
export default OrderCard;
