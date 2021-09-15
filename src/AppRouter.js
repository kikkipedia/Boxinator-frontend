import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import GuestHome from './components/guest/GuestHome';
import UserHome from './components/user/UserHome';
import Start from './components/start/Start'
import { PrivateRoute } from './utilities/PrivateRoute';
import Navigation from './components/shared/Navigation'
import NotFound from './components/notFound/NotFound'
import Profile from './components/user/Profile';


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
                <Route exact path="/guest" component={GuestHome} />
                <PrivateRoute roles={['user']} path="/user" component={UserHome} />
                <PrivateRoute roles={['user']} path="/profile" component={Profile}/>
                <PrivateRoute roles={['admin']} path="/admin" component={AdminHome} />
                <Route exact path="/*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </>
    );
};
export default AppRouter;