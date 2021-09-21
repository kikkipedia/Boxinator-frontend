import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { getAllOrders, getAllShipments } from "../../api/API";
import { Container} from 'react-bootstrap'
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
        
            shipments && shipments.length > 0 && shipments.map((shipment) => {
                cards.push(
                    <StatusChanger key={shipment.id}
                        orderId={shipment.id}
                        orderStatus={shipment.status.statusType}
                    ></StatusChanger>
                );
            });
        

        return cards;
    }

    return (
        <Container>
            <div>
                <CountryModal/>
                {displayCardStatus()}
                
            </div>
        </Container>
    )
}

export default AdminHome;
