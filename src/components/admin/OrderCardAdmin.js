import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getShipmentStatusHistoryByShipmentId } from "../../api/API";



const OrderCardAdmin = (props) => {
    const [status, setStatus] = useState();

    useEffect (()=>{
        // setStatusNew(props.id);
        console.log(status)
    },[status])

    // const setStatusNew = async (sts) =>{
    //     const data = await getShipmentStatusHistoryByShipmentId(sts);
    //     setStatus(data);
    // }
    

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
                    <tbody>
                    <tr>
                        <td>{props.orderName}</td>
                        <td>{props.orderColor}</td>
                        <td>{props.orderTotalPrice}</td>
                        <td>

                                <select  onChange={e => setStatus({ ...props.order,orderStatus: {id: e.target.value} })}className="form-select" aria-label="Default select example">
                                <option value="CREATED">Created</option>
                                <option value="RECEIVED">Received</option>
                                <option value="INTRANSIT">Intransit</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </Table>


            </Card.Body>
        </Card>
    );
};
export default OrderCardAdmin;
