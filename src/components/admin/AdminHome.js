import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { getAllOrders, getAllShipments } from "../../api/API";
import { Container } from 'react-bootstrap'
import StatusChanger from "./StatusChanger";
import CountryModal from "./CountryModal";


const AdminHome = () => {
    const { keycloak } = useKeycloak();
    const [orders, setOrders] = useState([]);
    const [shipments, setShipments] = useState([]);

    //Initializes token in session storage and sets both orders and shipments to their current values in the database
    useEffect(() => {
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        setOrdersNew();
        setShipmentsNew();
    }, [keycloak.token, keycloak.refreshToken])
    //Asynchronously retrieves all orders from the database, then sets their current state to be equivilent
    const setOrdersNew = async () => {
        const data = await getAllOrders();
        setOrders(data);
    }
    //Asynchronously retrieves all shipments from the database, then sets their current state to be equivilent
    const setShipmentsNew = async () => {
        const data = await getAllShipments();
        setShipments(data);
    }
    //Displays the Cards with the relevant information
    const displayCardStatus = () => {
        let cards = [];
        shipments.sort((a, b) => a.id - b.id)
        shipments && shipments.length > 0 && shipments.map((shipment) => {
            cards.push(

                <div key={shipment.id}>

                    <StatusChanger
                        orderId={shipment.id}
                        receiverName={orders[shipment.id - 1].receiverName}
                        email={orders[shipment.id - 1].email}
                        totalPrice={orders[shipment.id - 1].totalPrice}
                        orderStatus={shipment.status.statusType}
                        packageType={orders[shipment.id - 1].orderPackage}
                    />
                </div>

            );
        });


        return cards;
    }

    return (
        <Container>
            <div className="adminHomeContainer">
                <CountryModal />
                <div className="adminHomeHeader">ALL SHIPMENTS</div>
                {displayCardStatus()}

            </div>
        </Container>
    )
}

export default AdminHome;
