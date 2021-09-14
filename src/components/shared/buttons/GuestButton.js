import { Link } from 'react-router-dom';


const GuestButton = () => {
    return(
        <Link to="/guest">
              <button>Guest Login</button>
        </Link>
               
    )
   
}
export default GuestButton;