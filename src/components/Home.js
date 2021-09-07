import {useState} from "react";

const Home = () => {
    const [authToken, setAuthToken] = useState(sessionStorage.getItem("authentication"))
    const [userInfo, setUserInfo] = useState()

/*     useEffect(() => {
        setAuthToken(sessionStorage.getItem("authentication"))
    },[authToken]) */

/*     function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    
    function helloBackend (){
        let tempUserInfo = {
            userName : parseJwt(authToken).preferred_username,
            mail: parseJwt(authToken).email
        }
        setUserInfo(tempUserInfo)
        console.log(userInfo)
    } */





    return(

        <div>
            Guest Home
            {/* <p><button onClick={helloBackend}>FETCH</button></p> */}
{/*             <p>Username: {userInfo.userName}</p>
            <p>Email: {userInfo.mail}</p>
            <p>Role: {userInfo.role}</p> */}
        </div>

    )
}
export default Home