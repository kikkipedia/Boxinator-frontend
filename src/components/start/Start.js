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
    
//Redirects an authenticated user back to the /user 
    useEffect(()=>{
        if (keycloak.authenticated) {
                history.push("/user")   
      } 
    },[])


    return(
    
        <div className="content">          
            <h4>Welcome to Boxinator!</h4>
            <FontAwesomeIcon icon={faBoxOpen} size="10x" className="startIcon" style={{color: "black"}}/>
            <p><GuestButton/></p>
        </div>

    )
}
export default Start;