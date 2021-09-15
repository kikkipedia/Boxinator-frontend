import {Link, Redirect} from "react-router-dom";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import GuestOrderModal from "./GuestOrderModal";


const GuestHome = () => {

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
      {shouldRedirect ? <Redirect to="/guest"></Redirect> : null}
      <div className="guestHomeHeader">BOXINATOR</div>
      <div className="guestImgContainer">
        <img className="guestImg" src="../resources/images/blackBox.svg" alt="Black box"/>
      </div>     
      <div className="guestNewOrderBtnContainer">
        <GuestOrderModal/>
      </div>
      
      <p className="guestRegisterText">Don´t have a account yet? <Link className="guestRegisterLink" onClick={keycloak.register}>Register now</Link></p>
    </div>
  )
}
export default GuestHome;