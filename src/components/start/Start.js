
import ContextButton from "../shared/buttons/ContextButton"
import GuestButton from "../shared/buttons/GuestButton"
import { Redirect } from "react-router";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router';

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
        

        <div>
            {shouldRedirect ? <Redirect to="/guest"></Redirect> : null}
            Welcome to Boxinator! Login or continue as Guest?
            <ContextButton/>
            <GuestButton/>
        
        </div>

    )
}
export default Start;