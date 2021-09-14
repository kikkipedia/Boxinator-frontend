import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'


const GuestButton = () => {
    return(
        <Link to="/guest">
              <Button>Continue as guest</Button>
        </Link>
               
    )
   
}
export default GuestButton;