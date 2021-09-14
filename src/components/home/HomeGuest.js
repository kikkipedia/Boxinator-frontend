import {Redirect} from "react-router-dom";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import GuestOrderModal from "./modals/GuestOrderModal";


const HomeGuest = () => {

    const {keycloak} = useKeycloak();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        if ( sessionStorage.getItem("authentication") === keycloak.token) {
          setShouldRedirect(true);
      }
    })
  return (
    <div>
      {shouldRedirect ? <Redirect to="/home"></Redirect> : null}
      <h1>Home Page</h1>
       
      <strong>Welcome Guest</strong>
      <GuestOrderModal/>
      <button onClick={keycloak.register}>Register Now!</button>
    </div>
  )
}
export default HomeGuest;