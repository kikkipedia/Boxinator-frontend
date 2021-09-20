import { useState, useEffect, Component, useCallback } from "react"
import { Redirect } from "react-router";
import { getAllUsers, postNewUser } from "../../api/API"
import { useKeycloak } from '@react-keycloak/web'
import UserOrderModal from "./UserOrderModal";
import ProfileModal from "./ProfileModal";
import Shipments from "./Shipments"

const UserHome = () => {

    const {keycloak} = useKeycloak()

    const [newUser, setNewUser] = useState({
        address: keycloak.tokenParsed.address,
        contactNumber: keycloak.tokenParsed.contactNumber,
        dateOfBirth: keycloak.tokenParsed.dob,
        email: keycloak.tokenParsed.preferred_username,
        firstName: keycloak.tokenParsed.given_name,
        lastName: keycloak.tokenParsed.family_name,
        postalCode: keycloak.tokenParsed.postalCode,
        country: keycloak.tokenParsed.countryOfResidence
    })
    const [user, setUser] = useState([])
    const userEmail = keycloak.tokenParsed.email

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [shouldRedirectAdmin, setShouldRedirectAdmin] = useState(false)

    //Saves the users authentication token to the session storage
    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken)
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
    }, [userEmail])

    //Fetch all users from the database and check the new user already exits, and if not posts them to the database
    const checkUser = () => {
        try {
            getAllUsers()
            .then(data => {
            setUsers(data)
            const userFound = data.find(el => el.email === newUser.email)
            if(!userFound) {
                if (newUser.email !== undefined) {
                    postNewUser(newUser)
                    setUser(newUser)
                }
                else{console.log("cant find user email in database")}
            }
            else {
                setUserId(userFound.id)
                setUser(userFound)
                console.log(userFound.email, userFound.firstName)
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

        <div className="content">
            {shouldRedirectAdmin ? <Redirect to="/admin"></Redirect> : null}

            <UserOrderModal userId={userId} />
            <h4>All user shipments</h4>

            <Shipments id={userId} /> 
            <ProfileModal user={user} />


        </div>
    )
}
export default UserHome

