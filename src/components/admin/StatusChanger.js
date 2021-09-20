import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getShipmentById,getShipmentStatusHistoryByShipmentId, updateShipment, getAllOrders, createNewOrder, createNewShipment, updateShipmentStatus } from "../../api/API";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

const StatusChanger = (props) => {
    const [status, setStatus] = useState();
    const [newShipment, setNewShipment] = useState();

 
    const handleOnChange = async (event) => {
        setStatus({ orderStatus: { id: event.target.value } })
        updateShipmentStatus(props.orderId ,{ id: event.target.value })
     
    }

    return (
        <Card className="card-container">
            <Card.Header>
                <p>Order ID: {props.orderId} </p>
            </Card.Header>

            <Card.Body>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <select onChange={handleOnChange} className="form-select" aria-label="Default select example">
                                    <option value="1">Created</option>
                                    <option value="2">Intransit</option>
                                    <option value="3">Received</option>
                                    <option value="4">Completed</option>
                                    <option value="5">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </Table>


            </Card.Body>
        </Card>
    );

}
export default StatusChanger;