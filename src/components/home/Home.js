
import { useEffect } from "react"
import { useKeycloak } from '@react-keycloak/web';
import OrderModal from "../shared/modals/OrderModal";


const Home = () => {

    const {keycloak, initialized} = useKeycloak();
    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
    })
  return (
    <div>
      <h1>Home Page</h1>
       
      <strong>Welcome Users! </strong>
      {keycloak.tokenParsed.name}
      <OrderModal/>
    </div>
  )
}
export default Home