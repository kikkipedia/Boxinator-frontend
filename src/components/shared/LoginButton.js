import keycloak from "../../keycloak"
import Keycloak from 'keycloak-js';
import { useEffect } from "react";

const handleLogin = () => {
    // keycloak.login();
    // sessionStorage.setItem('authentication', keycloak.token);
    // sessionStorage.setItem('refreshToken', keycloak.refreshToken);
    let keycloak = Keycloak('./resources/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).success((authenticated) => {
        
        if (!authenticated) {
           window.location.reload();
           console.info("Not Authenticated");
        
           
        } else {
            console.info("Authenticated");
     
            sessionStorage.setItem('authentication', keycloak.token);
            sessionStorage.setItem('refreshToken', keycloak.refreshToken);
        }
        //store authentication tokens in sessionStorage for usage in app
        
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
      
     //to regenerate token on expiry
     setTimeout(() => {
            keycloak.updateToken(70).success((refreshed) => {
                if (refreshed) {
                    console.debug('Token refreshed' + refreshed);
                } else {
                    console.warn('Token not refreshed, valid for '
                        + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
                }
            }).error(() => {
                console.error('Failed to refresh token');
            });
      
      
        }, 60000)
      
     }).error(() => {
        console.error("Authenticated Failed");
     });
}

const LoginButton = () => {
    return (
        <button height="30px" width="60px" onClick={handleLogin}></button>
    )
}
export default LoginButton;