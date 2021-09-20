import { useKeycloak } from "@react-keycloak/web";

const AuthorizedElement = ({roles, children}) => {
    const {keycloak} = useKeycloak()
//Checks whether the user has the specific role required to access an element, and if they are autherized allows them access, otherwise they may not access the element
    const isAutherized = () => {
        if (keycloak && roles) {
            return roles.some(r =>{
                const realm = keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
    }
    return isAutherized() && children

}
export default AuthorizedElement;
  

