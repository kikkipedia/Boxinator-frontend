
const Home = () => {

    const logOut = () => {
        let redirectURI = "http://localhost:3000"
        window.location.href="https://keycloak-boxinator2.herokuapp.com/auth/realms/boxinator-app/protocol/openid-connect/logout?redirect_uri=" + redirectURI
    }

    return(
        // <button onClick={logOut}>LOG OUT</button>
        <div>
            Home!
        </div>
    )
}
export default Home