import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import GuestHome from './components/guest/GuestHome';
import UserHome from './components/user/UserHome';
import Start from './components/start/Start'
import { PrivateRoute } from './utilities/PrivateRoute';
import Navigation from './components/shared/Navigation'


export const AppRouter = () => {
    const {initialized} = useKeycloak();
    if (!initialized) {
        return <h3>Loading ... !!!</h3>;
    }
    return (<>
        <Navigation />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Start}/>
<<<<<<< HEAD
                <Route exact path="/guest" component={GuestHome} />
                <PrivateRoute roles={['user']} path="/user" component={UserHome} />
                <PrivateRoute roles={['admin']} path="/admin" component={AdminHome} />
=======
                <Route exact path="/homeGuest" component={HomeGuest} />
                <PrivateRoute roles={['user']}  path="/user" component={UserMain} />
                <PrivateRoute roles={['admin']} path="/admin" component={AdminMain} />
                <PrivateRoute roles={['user']} path="/home" component={Home} />
>>>>>>> daniel5
            </Switch>
        </BrowserRouter>
    </>
    );
};
export default AppRouter;