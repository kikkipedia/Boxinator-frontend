
import { useEffect } from "react"
import { useKeycloak } from '@react-keycloak/web';


const Home = () => {

    const {keycloak, initialized} = useKeycloak();
    useEffect(()=>{
        sessionStorage.setItem('authentication', keycloak.token);
        sessionStorage.setItem('refreshToken', keycloak.refreshToken);
    })
  return (
    <div>
      <h1>Home Page</h1>
       
      <strong>Anyone can access this page</strong>
            {/* {initialized ?
        keycloak.authenticated && <pre >{JSON.stringify(keycloak, undefined, 2)}</pre>
        : <h2>keycloak initializing ....!!!!</h2>
      } */}
    </div>
  )
}
export default Home