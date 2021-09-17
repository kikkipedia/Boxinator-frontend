import { useState, useEffect, Component } from "react"
import { Redirect } from "react-router";
import { getAllUsers, postNewUser } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import UserOrderModal from "./UserOrderModal";
import ProfileModal from "./ProfileModal";
import Shipments from "./Shipments"

const UserHome = () => {

    const {keycloak} = useKeycloak()
    const [user, setUser] = useState({
        id: keycloak.tokenParsed.sid,
        address: keycloak.tokenParsed.address,
        contactNumber: keycloak.tokenParsed.contactNumber,
        dateOfBirth: keycloak.tokenParsed.dob,
        email: keycloak.tokenParsed.preferred_username,
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        postalCode: keycloak.tokenParsed.postalCode,
        country: keycloak.tokenParsed.countryOfResidence
    })
    const userEmail = keycloak.tokenParsed.preferred_username
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false)
   
    useEffect(()=>{
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true)
        }
        else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
            setShouldRedirectAdmin(true)
        }        
    },[])
    //redirects if admin
    useEffect(()=>{
        if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin' ){
              setShouldRedirectAdmin(true);
      }
      console.log(user)
      checkUser()
    },[userEmail])
    useEffect(() => {
        //user changes
    },[user])
    //fetch all users
    const checkUser = () => {
        getAllUsers()
        .then(data => {
            setUsers(data)
            //check if user exists
            let userFound = data.find(el => el.email === user.email)
            if(!userFound) {
                //if not - post new user to database
                if (user.email !== undefined) {
                    postNewUser(user)
                }
                else{console.log("cant find user email in database")}
            }
            else {
                setUserId(keycloak.tokenParsed.sid)
                console.log("user exists: ", userFound.email, userFound.id)
            }
        })
    }
    useEffect(() => {
        if(users.length) {
            //if new user is saved // array changes => re-render
        }
    },[users])
    //modal open/close

    useEffect(() => {
        if(userId !== undefined) {
            <ProfileModal userId={userId} />
        }
        
    }, [userId])

    return (
        <div className="content">
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

            <UserOrderModal userId={userId} />
            <h4>All user shipments</h4>
            <Shipments id={userId} /> 

        </div>
    )
}
export default UserHome

