import { useState, useEffect } from "react"
import { Redirect } from "react-router";
import { Container} from 'react-bootstrap'
import {  getAllUsers,  postNewUser } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web';
import OrderModal from "../user/OrderModal";

import Shipments from "./Shipments"


const UserHome = () => {

    const authToken = sessionStorage.getItem("authentication")
    const {keycloak} = useKeycloak()
    const [userEmail, setUserEmail] = useState()
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false);

    //TODO - this is sometimes too slow!
    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true)
        }
        else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
            setShouldRedirectAdmin(true)
        }        
    },[])

    //Redirects if admin
    useEffect(()=>{
       if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin' ){
              setShouldRedirectAdmin(true);
      }
    },[])

    //user email from token
    useEffect(() => {
        setUserEmail(keycloak.tokenParsed.preferred_username) 
    },[authToken])

    useEffect(() => {
        //userId changes
    },[userId])

    //fetch al users
    useEffect(() => {
        getAllUsers()
        .then(data => {
            console.log(data)
            setUsers(data)
            //check if user exists
            let user = data.find(el => el.email === userEmail)
            if(!user) {
                if (userEmail !== undefined) {
                    const reqParams = {
                        email: userEmail
                    }
                    console.log(reqParams)
                    postNewUser(reqParams)
                }
                else{console.log("cant find email")}
            }
            else {
                setUserId(user.id)
                console.log("user exists: ", user.email, user.id)
            }
        })
    },[userEmail])

    useEffect(() => {
        if(users.length) {
            //if new user is saved // array changes => re-render
        }
    },[users])
        
    // const parseJwt = (token) => {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    //     }).join(''))
    //     return JSON.parse(jsonPayload)
    // }   

    return (
        
        <Container>
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

            <Shipments id={userId}/>
            <hr/>
            <OrderModal id={userId}/>
        </Container>
    )
}

export default UserHome

