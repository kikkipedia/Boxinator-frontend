import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import GuestOrderModal from "./GuestOrderModal";


const GuestHome = () => {

  const { keycloak } = useKeycloak();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  //Saves the authentication token to session storage, and redirects if the user is authenticated
  useEffect(() => {
    sessionStorage.setItem('authentication', keycloak.token);
    sessionStorage.setItem('refreshToken', keycloak.refreshToken);
    if (sessionStorage.getItem("authentication") === keycloak.token) {
      setShouldRedirect(true);
    }
  },[keycloak.token, keycloak.refreshToken])

  return (
    <div className="guestHomeContainer">
      {shouldRedirect ? <Redirect to="/user"></Redirect> : null}
      <div className="guestHomeHeader">BOXINATOR</div>
      <div className="guestHomeText">GUEST</div>
      
      <div className="guestBtnContainer">
        <GuestOrderModal />
      </div>
    </div>
  )
}
export default GuestHome;