import { Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import {  getShipmentStatusHistoryByShipmentId, updateShipment, getAllOrders, createNewOrder, createNewShipment, getShipmentById } from "../../api/API";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";



const OrderCardAdmin = (props) => {
    //ORDERS
    const [newShipment, setNewShipment] = useState();
    

    useEffect (()=>{
        // setStatusNew(props.id);
        // console.log(status)
        
        console.log(newShipment)
        
    },[])

    // const setStatusNew = async (sts) =>{
    //     const data = await getShipmentStatusHistoryByShipmentId(sts);
    //     setStatus(data);
    // }
    // const handleOnChange = async (event) =>{
    //     setStatus({orderStatus: {id: event.target.value} })
    //     setNewShipment({ ...props,orderStatus: {id: event.target.value} })
    //     updateShipment(newShipment)
    //     // createNewShipment(newShipment)
    //     // createNewOrder(newShipment)

    // }
   
    

    return (
        <Card className="card-container">
            <Card.Header>
                <p>Order ID: {props.orderId}</p>
            </Card.Header>

            <Card.Body>
                <Table>
                    <thead>
                        <tr>

                            <th>Receiver Name</th>
                            <th>Color</th>
                            <th>Total Price</th>
                        
                        </tr>

                    </thead>
                    <tbody>
                    <tr>
                        <td>{props.orderName}</td>
                        <td>{props.orderColor}</td>
                        <td>{props.orderTotalPrice}</td>
                        <td>
                            {/* {displayCardStatus()} */}
                        </td>
                        {/* <td>

                                <select  onChange={handleOnChange}className="form-select" aria-label="Default select example">
                                <option value="1">Created</option>
                                <option value="2">Received</option>
                                <option value="3">Intransit</option>
                                <option value="4">Completed</option>
                                <option value="0">Cancelled</option>
                            </select>
                        </td> */}
                    </tr>
                    </tbody>
                </Table>


            </Card.Body>
        </Card>
    );
};
export default OrderCardAdmin;
