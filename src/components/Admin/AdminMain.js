import {Table} from "react-bootstrap";

const AdminMain = () => {

    return(
        <div>
            Admin main page
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th></th>
                    <th>E-Mail</th>
                    <th>Order</th>
                    <th>Shipment Status</th>
                    <th>Multiplier ?</th>
                    <th>Country</th>
                    <th>Total Price</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default AdminMain