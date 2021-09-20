
import { useState, useEffect } from "react"
import { Modal } from 'react-bootstrap'
import { getShipmentById } from "../../api/API"

const ShipmentModal = (props) => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState(['Created']);
    const [shipments, setShipments] = useState([])

    //Asynchronously retrieves all shipments with matching id to the order id
    useEffect(() => {
        getShipmentById(props.id)
            .then(data => {
                console.log(data.status)
                setStatus(data.status)  
            })
        console.log(status)

    }, [props.id])

    const setShipmentsNew = async (id) => {
        const data = await getShipmentById(id);
        setShipments(data);
    }

    //Parse the shipments status code from the API link received, then returns the string equivalent to that code
    const parseStatus = (stausAPILink) => {
        const statusString = JSON.stringify(stausAPILink)
        if (statusString === undefined) {
            console.log("Link empty")
            return 'EMPTY'
        } else if (statusString.charAt(statusString.length - 2) === 1) {
            return 'Created'
        }


        else {
            let sts = statusString.charAt(statusString.length - 2)
            let statusCode = parseInt(sts);
            switch (statusCode) {
                case 1:
                    return 'Created'
                    break;
                case 2:
                    return 'Intransit'
                    break;
                case 3:
                    return 'Received'
                    break;
                case 4:
                    return 'Completed'
                    break;
                case 5:
                    return 'Cancelled'
                    break;
                default:
                    return 'Error'

            }
        }

    }

    //modal
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <div>
            <button className="guestNewOrderBtn" onClick={handleShow}>View Status</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ "font-weight": "bold" }}>View Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {status}
                        {parseStatus(status)}
                    </div>

                    <div className="orderBtnContainer">
                        <button className="orderBtn" >Cancel Order?</button>
                    </div>


                </Modal.Body>

            </Modal>
        </div>
    )
}
export default ShipmentModal;