import { Card, Table } from "react-bootstrap";
import { useState, useEffect} from "react";
import {  updateShipmentStatus, getShipmentById } from "../../api/API";
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
                                    <option className="orderStatusText" value="1">Created</option>
                                    <option className="orderStatusText" value="2">Intransit</option>
                                    <option className="orderStatusText" value="3">Received</option>
                                    <option className="orderStatusText" value="4">Completed</option>
                                    <option className="orderStatusText" value="5">Cancelled</option>
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