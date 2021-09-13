import { useState, useEffect } from "react"

import { Container} from 'react-bootstrap'
import {  getAllUsers,  postNewUser } from "../../api/API"

import Shipments from "./Shipments"


const UserMain = () => {

    const authToken = sessionStorage.getItem("authentication")

    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()

    //user email from token
    useEffect(() => {
        setUserEmail(parseJwt(authToken).email)
        fetchUser()
    },[authToken])

    //save if new user, or else fetch user 

    const getUserByEmail = () => {      
        let foundUser = users.find(element => element.email === userEmail)
        setUser(foundUser)             
    }

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
            console.log("user already exists: " + userId)
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

 

    

    // const sortData = (a, b) => {
    //     if(a.name < b.name){
    //         return -1
    //     }
    //     else if (a.name > b.name) {
    //         return 1
    //     }
    //     else {
    //         return 0
    //     }
    // } 


    return (
        <Container>


            <Shipments/>
            <hr/>

        </Container>
    )
}

export default UserMain

