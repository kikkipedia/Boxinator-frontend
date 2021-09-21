
import { useState, useEffect } from "react"
import { Modal } from 'react-bootstrap'
import { getShipmentById, updateShipmentStatus } from "../../api/API"
import parseStatus from "../../utilities/ParseStatus";

 const ShipmentModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [timestamp, setTimestamp] = useState(1)
    const [shipmentStatusHistory, setShipmentStatusHistory] = useState()
    const [shipmentId, setShipmentId] = useState()

    //Asynchronously retrieves all shipments with matching id to the order id, then assigns several states based upon this data
    useEffect(() => {
        setTimestamp(1)
        getShipmentById(props.id)
            .then(data => {
                setShipmentId(props.id)
                setStatus(data.status)
                setShipmentStatusHistory(data.shipmentStatusHistory[0])
                setTimestamp(data.shipmentStatusHistory[0].timestamp)
            })
            
    }, [props.id])

    //Handles the change when a user cancels their order
    const handleOnChange = async () => {
        setStatus('/api/statuses/5')
        updateShipmentStatus(shipmentId, { id: 5 })

    }
    // Parse time from timestamp and show in a more readable fashion
    const parseTime = (tStamp) => {
        let time = tStamp
        let date = new Date(time);
        let dateTimeString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        return dateTimeString;
    }

   
    //Shows the modal based upon a boolean value
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="guestNewOrderBtn" onClick={handleShow}>{parseStatus(status)}</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>View Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Current Status: {parseStatus(status)}</p>
                        <p>Creation time: {parseTime(timestamp)}</p>
                        
                    </div>

                    <div className="orderBtnContainer">
                        <button className="orderBtn" onClick={handleOnChange} >Cancel Order?</button>
                    </div>


                </Modal.Body>

            </Modal>
        </div>
    )
}
export default ShipmentModal;