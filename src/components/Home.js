import {useEffect, useState} from "react";

const Home = () => {
    const [authToken, setAuthToken] = useState("")
    const [testData, setTestData] = useState("")


    const logOut = () => {
        let redirectURI = "http://localhost:3000"
        window.location.href="https://keycloak-boxinator2.herokuapp.com/auth/realms/boxinator-app/protocol/openid-connect/logout?redirect_uri=" + redirectURI
    }
    async function helloBackend (){
        var response = await fetch("http://localhost:8080/test/user", {
             method: "GET",
             mode: "cors",
             "Access-Control-Allow-Origin": "http://localhost:8080/test/user",
             headers: {
                 Accept: "application/json",
                 "Content-Type": "application/json",
                 "Authorization": "Bearer " + authToken

             }
      //       }).then((response) => response.json())
         });//.then((response) => console.log(response.text()))
            // .then((data) => console.log(data))
         var body = await response.text()

        await console.log(body)


     }

    useEffect(() => {
        setAuthToken(sessionStorage.authentication)
         console.log(authToken)

    }, [])

    return(
        <div>
            Home!
            <button onClick={helloBackend}>FETCH</button>

            {testData ? <div>
                {testData}
            </div>
            : null}
        </div>

    )
}
export default Home