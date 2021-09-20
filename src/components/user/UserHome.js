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

    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken)
    })
    useEffect(()=>{
        if ( sessionStorage.getItem("authentication") === undefined ) {
              setShouldRedirect(true)
        }
        else if(keycloak.tokenParsed.realm_access.roles[2] === 'app-admin'){
            setShouldRedirectAdmin(true)
        }        
    },[])


    //check if user exiits in database
    useEffect(() => {
        checkUser()
    }, [userEmail])

    //fetch all users
    const checkUser = () => {
        try {
            getAllUsers()
            .then(data => {
            setUsers(data)
            //check if user exists
            const userFound = data.find(el => el.email === newUser.email)
            if(!userFound) {
                //if not - post new user to database
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

    useEffect(() => {
        if(users.length) {
            //if new user is saved // array changes => re-render
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

