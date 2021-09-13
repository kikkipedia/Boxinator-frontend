import { useEffect, useState } from "react"
import { getOrdersByUserId } from "../../api/API"

const Shipments = (props) => {
    const id = props.userId
    const [shipments, setShipments] = useState([])
    const [oldShipments, setOldShipments] = useState([])
    const [inTransit, setInTransit] = useState([])

    useEffect(() => {
        getOrdersByUserId(id)
        .then(data => setShipments(data))
        sortShipments()
    },[id])

    const sortShipments = () => {
        console.log("all shipments: " + shipments)
        //sort by shipments status
    }

    return(
        <div>
            <p>User id: {props.userId}</p>
            <h4>Shipments in transit</h4>
            <h4>Recieved shipments</h4>

        </div>
        
    )
}
export default Shipments
