import { Link, Redirect } from "react-router-dom";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import GuestOrderModal from "./GuestOrderModal";


const GuestHome = () => {

  const { keycloak } = useKeycloak();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('authentication', keycloak.token);
    sessionStorage.setItem('refreshToken', keycloak.refreshToken);
    if (sessionStorage.getItem("authentication") === keycloak.token) {
      setShouldRedirect(true);
    }
  })

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