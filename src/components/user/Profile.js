import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const Profile = () => {

    const [user, setUser] = useState([])

    //get user info

    //fill form with info

    //save new info

    return(
        <div className="content">
            <h4>Edit your profile</h4>

            <p><Button>Save</Button></p>
            
            <p><Button variant="secondary">Cancel</Button></p>
        </div>
    )
}
export default Profile