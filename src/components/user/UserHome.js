import { useState, useEffect, Component, useCallback } from "react"
import { Redirect } from "react-router";
import { getAllUsers, postNewUser, updateOrderByEmail } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import UserOrderModal from "./UserOrderModal";
import ProfileModal from "./ProfileModal";
import Shipments from "./Shipments"

const UserHome = () => {

    const {keycloak} = useKeycloak()

    const [newUser, setNewUser] = useState({
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        address: keycloak.idTokenParsed.address,
        contactNumber: keycloak.idTokenParsed.contactNumber,
        dateOfBirth: keycloak.idTokenParsed.dob,
        email: keycloak.tokenParsed.email,
        postalCode: keycloak.idTokenParsed.postalCode,
        country: keycloak.idTokenParsed.countryOfResidence
    })
    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false)
    //const [reloadCount, setReloadCount] = useState(0)

    //Saves the users authentication token to the session storage
    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        sessionStorage.setItem('idToken', keycloak.idToken);
        //forceReload()
    },[])
    useEffect(()=>{
        updateOrderByEmail(keycloak.tokenParsed.email)
    })
    //Redirects the user if they lack and authenicatiion token or they are an admin
    useEffect(()=>{
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true)
        }
        else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
            setShouldRedirectAdmin(true)
        }        
    },[])


    //Check if user exists in database
    useEffect(() => {
        checkUser()
    }, [])

    //Force a reload in order to render data
    const forceReload = ()=> {
       const reloadCount = sessionStorage.getItem('reloadCount');
        if(reloadCount < 2) {
           //setReloadCount(reloadCount + 1)
           sessionStorage.setItem('reloadCount', String(reloadCount +1));
           updateOrderByEmail(keycloak.tokenParsed.email)
          window.location.reload();
         } else{
            sessionStorage.removeItem('reloadCount')
         }
      }

    //Fetch all users from the database and check the new user already exits, and if not posts them to the database
    const checkUser = () => {
        try {
            getAllUsers()
            .then(data => {
            setUsers(data)
            const userFound = data.find(el => el.email === newUser.email)
            if(!userFound) {
                if (newUser.email !== undefined) {
                    setNewUser(newUser)
                    postNewUser(newUser)
                    sessionStorage.removeItem('reloadCount');
                    forceReload()
                }
                else{console.log("cant find user email in database")}
            }
            else {
                setUserId(userFound.id)
                setUser(userFound)
            }
        })
        }
        catch(err) { console.log(err) }
    }

    //If a new user is saved or the array changes then a re-render is triggered
    useEffect(() => {
        if(users.length) {
        }
    },[users])


    return (        

        <div className="userHomeContent">
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}
            <div className="userHomeHeader">YOUR ORDERS</div>
            <UserOrderModal userId={userId} />
            <ProfileModal user={user}/> 
            <Shipments id={userId} /> 
        </div>
    )
}
export default UserHome

