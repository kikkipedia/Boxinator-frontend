import ContextButton from "../shared/buttons/ContextButton"
import GuestButton from "../shared/buttons/GuestButton"
import { Redirect } from "react-router";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const Start = () => {

    const history = useHistory();
    const {keycloak} = useKeycloak();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(()=>{
        if (keycloak.authenticated) {
                history.push("/user")
              //setShouldRedirect(true);
      }
        
    },[shouldRedirect])


    return(
        

        <div className="content">
            {shouldRedirect ? <Redirect to="/guest"></Redirect> : null}
            
            <h4>Welcome to Boxinator!</h4>
            <FontAwesomeIcon icon={faBoxOpen} size="10x" className="startIcon"/>
            <p><ContextButton/></p>
            <p><GuestButton/></p>
            
        
        </div>

    )
}
export default Start;