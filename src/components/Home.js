import {useEffect, useState} from "react";

const Home = () => {
    const [authToken, setAuthToken] = useState("")
    const [userInfo, setUserInfo] = useState("")


    const logOut = () => {
        let redirectURI = "http://localhost:3000"
        window.location.href="https://keycloak-boxinator2.herokuapp.com/auth/realms/boxinator-app/protocol/openid-connect/logout?redirect_uri=" + redirectURI
    }
     function helloBackend (){
      //   var response = await fetch("http://localhost:8080/test/user", {
      //        method: "GET",
      //        mode: "cors",
      //        "Access-Control-Allow-Origin": "http://localhost:8080/test/user",
      //        headers: {
      //            Accept: "application/json",
      //            "Content-Type": "application/json",
      //            "Authorization": "Bearer " + authToken
      //
      //        }
      // //       }).then((response) => response.json())
      //    });//.then((response) => console.log(response.text()))
      //       // .then((data) => console.log(data))
      //    var body = await response.text()
      //
      //   await console.log(body)
         let tempUserInfo = {
             userName : parseJwt(authToken).preferred_username,
             mail: parseJwt(authToken).email
         }
         setUserInfo(tempUserInfo)
        console.log(userInfo)

     }

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

   useEffect(() => {
        setAuthToken(sessionStorage.getItem("authentication"))
        console.log(authToken)
        //fetchUserInfo()
    }, [])


    return(
        <div>
            Home!
            <button onClick={helloBackend}>FETCH</button>

        </div>

    )
}
export default Home