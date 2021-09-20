import ContextButton from "../shared/buttons/ContextButton"
import GuestButton from "../shared/buttons/GuestButton"
import { Link, Redirect } from "react-router-dom";
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

    const onClickContinueButton = () => {
        history.push("/guest")
    }

    return (
        <div className="startContainer">
          <div className="startHeader">BOXINATOR</div>
          <div className="startImgContainer">
            <img className="startImg" src="../resources/images/blackBox.svg" alt="Black box" />
          </div>
          <div className="startBtnContainer">
          <button className="startContinueAsGuestBtn" onClick={onClickContinueButton}>CONTINUE AS GUEST</button>
          </div>
          <div className="startBtnContainer">
            <button className="startLoginBtn" onClick={() => keycloak.login()}>SIGN IN</button>
          </div>
          <p className="startRegisterText">Don´t have an account yet? <Link className="startRegisterLink" onClick={keycloak.register}>Register now</Link></p>
    
        </div>
      )
}
export default Start;