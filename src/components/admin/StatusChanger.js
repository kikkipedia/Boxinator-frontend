import { Card, Table } from "react-bootstrap";
import { useState, useEffect} from "react";
import {  updateShipmentStatus } from "../../api/API";
import parseStatus from "../../utilities/ParseStatus";
import { set } from "react-hook-form";


const StatusChanger = (props) => {
    const [status, setStatus] = useState("Created");
    const [newShipment, setNewShipment] = useState();

    useEffect(() => {
       setStatus(props.status)
    }, [props.id])


    //Handles the changing of state caused when the user selects a status , the updates the status state in the database
    const handleOnChange = async (event) => {
        setStatus(  event.target.value  )
        updateShipmentStatus(props.orderId ,{ id: event.target.value })
     
    }

    return (
        <Card className="card-container">
            <Card.Header>
                <p>Order ID: {props.orderId} </p>
                <p>Current Status: {parseStatus(status)}</p>
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