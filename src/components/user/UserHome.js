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
            setUsers(data)
            //check if user exists
            let user = data.find(el => el.email === userEmail)
            if(!user) {
                //if not - post new user to database
                if (userEmail !== undefined) {
                    const reqParams = {
                        email: userEmail
                    }
                    console.log(reqParams)
                    postNewUser(reqParams)
                }
                // userEmail == null --> should re-render TODO?
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

    return (
        
        <Container>
            {userId}
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

            <Shipments id={userId}/>
            <hr/>
            <OrderModal id={userId}/>
        </Container>
    )
}

export default UserHome

