
import { useEffect, useState } from "react"
import { Redirect } from "react-router";
import { useKeycloak } from '@react-keycloak/web';
import OrderModal from "./modals/OrderModal";



const Home = () => {

    const {keycloak} = useKeycloak();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false);

    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true);
      }else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
              setShouldRedirectAdmin(true);
      }
        
    })
  return (
    <div>
      {shouldRedirect ? <Redirect to="/homeGuest"></Redirect> : null}
      {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

      <h1>Home Page</h1>
       
      <strong>Welcome Users! </strong>
      {keycloak.tokenParsed.name}
      <OrderModal/>
    </div>
  )
}
export default Home