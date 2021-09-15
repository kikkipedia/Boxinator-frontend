import { useState, useEffect } from "react"
import { Redirect } from "react-router";
import { Container} from 'react-bootstrap'
import {  getAllUsers,  postNewUser } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web';
import OrderModal from "../user/OrderModal";
import { getAllOrders } from "../../api/API";

import Shipments from "./Shipments"


const UserHome = () => {

    const authToken = sessionStorage.getItem("authentication")
    const {keycloak} = useKeycloak();
    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false);

    //Redirects if not a user  or an admin
    useEffect(()=>{
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true);
      }else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
              setShouldRedirectAdmin(true);
      } 
    })
    //Initializes token in session storage
    useEffect(() => {
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        
    }, [])

    //user email from token
    useEffect(() => {
        //setUserEmail(parseJwt(authToken).email)
        setUserEmail(keycloak.tokenParsed.preferred_username)
        const fetchUsers = async() => {
            try {
                await getAllUsers()
                .then(data => setUsers(data))
            }
            catch(error) {console.log(error)}
        }
        fetchUsers()       
    },[authToken, userEmail])

    //save if new user, or else fetch user 
    useEffect(() => {
        if(user === undefined) {
            const post = {
                email: userEmail,
                role: 1
            }
            postNewUser(post)
            .then(data => setUserId(data.id))
        }
        else {
            setUserId(user.id)
            console.log("User already exists: " + userId)
        }
    },[user])

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        }).join(''))
        return JSON.parse(jsonPayload)
    }   
    const getUserByEmail = () => {      
        let foundUser = users.find(element => element.email === userEmail)
        setUser(foundUser)             
    }


    return (
        
        <Container>
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}
            <Shipments/>
            <OrderModal/>
            <hr/>

        </Container>
    )
}

export default UserHome;

