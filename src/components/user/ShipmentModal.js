
import { useState, useEffect } from "react"
import { Modal } from 'react-bootstrap'
import { getShipmentById, updateShipmentStatus } from "../../api/API"
import parseStatus from "../../utilities/ParseStatus";
import { getShipmentStatusHistoryByShipmentId } from "../../api/API";

const ShipmentModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [timestamp, setTimestamp] = useState(1)
    const [shipmentStatusHistory, setShipmentStatusHistory] = useState([])
    //const [mostRecentTimestamp, ]
    const [shipmentId, setShipmentId] = useState()

    //Asynchronously retrieves all shipments with matching id to the order id, then assigns several states based upon this data
    useEffect(() => {
        setTimestamp(1)
        getShipmentById(props.id)
            .then(data => {
                setShipmentId(props.id)
                setStatus(data.status)
                 setTimestamp(data.shipmentStatusHistory[0].timestamp)
            })
        getShipmentStatusHistoryByShipmentId(props.id)
            .then(data => {
                setShipmentStatusHistory([data])
                console.log(shipmentStatusHistory)
            })

    }, [props.id])

    //Handles the change when a user cancels their order
    const onClickCancelBtn = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to cancel this order?")

            if (confirm) {
                setStatus('/api/statuses/5')
                updateShipmentStatus(shipmentId, { id: 5 })
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    // Parse time from timestamp and show in a more readable fashion
    const parseTime = (tStamp) => {
        let time = tStamp
        let date = new Date(time);
        let dateTimeString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        return dateTimeString;
    }

    const displayStatusHistory = () => {


    }

    const setShipmentHistoryNew = async (id) => {
        let arr = await getShipmentStatusHistoryByShipmentId(id)
        return arr;
    }


    //Shows the modal based upon a boolean value
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="statusBtn" onClick={handleShow}>{parseStatus(status)}</button>
            <Modal show={show} onHide={handleClose} className="statusHistoryModal">
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>STATUS HISTORY</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>CURRENT STATUS: {parseStatus(status)}</p>
                        <p>UPDATED: {parseTime(timestamp)}</p>
                        {/* <div>HISTORY: {shipmentStatusHistory.length}
                            {
                                shipmentStatusHistory && shipmentStatusHistory.length > 0 && shipmentStatusHistory.map((shipment) => {
                                    <div key={shipment.id}>
                                        orderStatus={shipment.status}
                                        timestamp={shipment.timestamp}
                                    </div>
                                    console.log(shipment.status)
                                })
                            }
                        </div> */}



                    </div>

                    <div className="cancelBtnContainer">
                        <button className="cancelBtn" onClick={onClickCancelBtn} >CANCEL ORDER</button>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}
export default ShipmentModal;