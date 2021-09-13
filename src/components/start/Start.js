
import ContextButton from "../shared/buttons/ContextButton"
import GuestButton from "../shared/buttons/GuestButton"

const Home = () => {


    return(

        <div>
            Welcome to Boxinator! Login or continue as Guest?
            <ContextButton/>
            <GuestButton/>
        
        </div>

    )
}
export default Home