
import { useState, useEffect } from "react"
import { Modal, Table } from 'react-bootstrap'
import { getShipmentById, updateShipmentStatus } from "../../api/API"
import parseStatus from "../../utilities/ParseStatus";
import { getShipmentStatusHistoryByShipmentId, postNewShipmentStatusHistory } from "../../api/API";

const ShipmentModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [timestamp, setTimestamp] = useState(1)
    const [shipmentStatusHistory, setShipmentStatusHistory] = useState([])
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
                //console.log(shipmentStatusHistory)
            })

    }, [props.id])

    //Handles the change when a user cancels their order
    const onClickCancelBtn = async () => {
        try {
            const confirm = window.confirm("Are you sure you want to cancel this order?")

            if (confirm) {
                setStatus('/api/statuses/5')
                updateShipmentStatus(shipmentId, { id: 5 })
                postNewShipmentStatusHistory(5, shipmentId)
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
    //Retrievs the status history information from the shipment, then displays its status and time of that staus in a table
    const displayStatusHistory = () => {
        let arr = []
        shipmentStatusHistory.forEach(element => {
            arr.push(
                <div className="content">
                    <Table bordered size="sm" className="orderTable">

                        <thead style={{ "backgroundColor": "#212529", "color": "white" }}>
                            <tr>
                                <th style={{ "padding": "10px", "borderTopLeftRadius": "10px" }}>STATUS</th>
                                <th style={{ "padding": "10px", "borderTopRightRadius": "10px" }}>TIME</th>
                            </tr>
                        </thead>
                        <tbody style={{ "fontSize": "18px" }}>
                            {element && !!element.length && element.map(object => (
                                <tr key={object.id}>
                                    <td style={{"padding": "10px", "fontWeight": "lighter"}}>{parseStatus(object.status)}</td>
                                    <td style={{"padding": "10px", "fontWeight": "lighter"}}>{parseTime(object.timestamp)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )
        })
        return arr
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
                    
                        {displayStatusHistory()}

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