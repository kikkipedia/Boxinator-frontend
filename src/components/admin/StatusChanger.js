import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateShipmentStatus, getShipmentById, postNewShipmentStatusHistory } from "../../api/API";
import parseStatus from "../../utilities/ParseStatus";
import parsePackage from "../../utilities/ParsePackage"

const StatusChanger = (props) => {
    const [status, setStatus] = useState();
    //Gets the shipment by it's id then sets the status to that shipments status value
    useEffect(() => {
        getShipmentById(props.orderId)
            .then(data => {
                setStatus(data.status)
            })
    }, [props.orderStatus, props.orderId])


    //Handles the changing of state caused when the user selects a status , the updates the status state in the database
    const handleOnChange = async(event) => {

        const confirm = window.confirm("Are you sure you want to update shipment status?")
        
        if (confirm) {
            setStatus(event.target.value)
            updateShipmentStatus(props.orderId, { id: event.target.value })
            postNewShipmentStatusHistory(event.target.value, props.orderId)

        }

    }

    return (
        <Card className="card-container">
            <div className="adminCardHeader">
                <div className="adminCardOrderId">ORDER ID: {props.orderId} </div>
            </div>

            <Card.Body>
                <div>
                    <div className="adminCardOrderInfo"><span className="labelWord">RECEIVER NAME: </span>{props.receiverName}</div>
                    <div className="adminCardOrderInfo"><span className="labelWord">EMAIL: </span>{props.email}</div>
                    <div className="adminCardOrderInfo"><span className="labelWord">TOTAL PRICE: </span>{props.totalPrice} SEK</div>
                    <div className="adminCardOrderInfo"><span className="labelWord">PACKAGE TYPE: </span>{parsePackage(props.packageType)}</div>
                    <div className="adminCardOrderInfo"><span className="labelWord">CURRENT STATUS: </span>{parseStatus(status)}</div>
                    <div className="changeStatusContainer">
                        <div className="labelWord">CHANGE STATUS</div>
                        <select onChange={handleOnChange} className="changeStatusSelect" aria-label="Default select example">
                            <option className="orderStatusText" value="1">Created</option>
                            <option className="orderStatusText" value="2">Intransit</option>
                            <option className="orderStatusText" value="3">Received</option>
                            <option className="orderStatusText" value="4">Completed</option>
                            <option className="orderStatusText" value="5">Cancelled</option>
                        </select>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );

}
export default StatusChanger