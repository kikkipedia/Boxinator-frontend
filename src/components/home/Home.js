import Keycloak from 'keycloak-js';
import { useState, useEffect } from "react"
import keycloak from '../../keycloak';
import LoginButton from '../shared/LoginButton';

const Home = () => {


    return(

        <div>
            Guest Home
            <LoginButton >Log In</LoginButton>
        </div>

    )
}
export default Home