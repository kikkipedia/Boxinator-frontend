import { Card, Table } from "react-bootstrap";
import { useState, useEffect} from "react";
import {  updateShipmentStatus, getShipmentById, postNewShipmentStatusHistory } from "../../api/API";
import parseStatus from "../../utilities/ParseStatus";
import parsePackage from "../../utilities/ParsePackage";
import { set } from "react-hook-form";


const StatusChanger = (props) => {
    const [status, setStatus] = useState();
    const [newShipment, setNewShipment] = useState();

    useEffect(() => {
        getShipmentById(props.orderId)
        .then(data => {
            setStatus(data.status)
        })
    }, [props.orderStatus])


    //Handles the changing of state caused when the user selects a status , the updates the status state in the database
    const handleOnChange = async (event) => {
        const confirm = window.confirm("Are you sure you want to update shipment status?")
        if (confirm) {
            setStatus(  event.target.value  )
            updateShipmentStatus(props.orderId ,{ id: event.target.value })
            postNewShipmentStatusHistory(event.target.value, props.orderId  )

        }
     
    }

    return (
        <Card className="card-container">
            <div className="adminCardHeader">
                <div className="orderIdTxt">ORDER ID: {props.orderId} </div>
                <div className="receiverName">RECEIVER NAME: {props.receiverName}</div>
                <div className="email">EMAIL: {props.email}</div>
                <div className="totalPrice">TOTAL PRICE: {props.totalPrice} kr</div>
                <div className="totalPrice">PACKAGE TYPE: {parsePackage(props.packageType)}</div>
                <div className="currentStatusTxt">CURRENT STATUS: {parseStatus(status)}</div>
            </div>

            <Card.Body>
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                <select onChange={handleOnChange} className="form-select" aria-label="Default select example">
                                    <option value="0">Created</option>
                                    <option value="1">Intransit</option>
                                    <option value="2">Received</option>
                                    <option value="3">Completed</option>
                                    <option value="4">Cancelled</option>
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