
import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { useKeycloak } from '@react-keycloak/web';
import OrderModal from "../shared/modals/OrderModal";



const Home = () => {

    const {keycloak} = useKeycloak();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true);
      }
        
    })
  return (
    <div>
      {shouldRedirect ? <Redirect to="/homeGuest"></Redirect> : null}
      <h1>Home Page</h1>
       
      <strong>Welcome Users! </strong>
      {keycloak.tokenParsed.name}
      <OrderModal/>
    </div>
  )
}
export default Home