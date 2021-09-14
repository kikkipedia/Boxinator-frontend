
import ContextButton from "../shared/buttons/ContextButton"
import GuestButton from "../shared/buttons/GuestButton"
import { Redirect } from "react-router";
import { useEffect, useState } from "react"
import { useKeycloak } from '@react-keycloak/web';

const Home = () => {

    const {keycloak} = useKeycloak();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(()=>{
        if ( sessionStorage.getItem("authentication") === undefined || sessionStorage.getItem("authentication") === keycloak.token ) {
              setShouldRedirect(true);
      }
        
    })
    return(
        

        <div>
            {shouldRedirect ? <Redirect to="/homeGuest"></Redirect> : null}
            Welcome to Boxinator! Login or continue as Guest?
            <ContextButton/>
            <GuestButton/>
        
        </div>

    )
}
export default Home