import { useKeycloak } from '@react-keycloak/web';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminMain from './components/admin/AdminMain';
import Home from './components/home/Home'
import HomeGuest from './components/home/HomeGuest';
import UserMain from './components/user/UserMain'
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
                <Route exact path="/homeGuest" component={HomeGuest} />
                <PrivateRoute roles={['user']}  path="/user" component={UserMain} />
                <PrivateRoute roles={['admin']} path="/admin" component={AdminMain} />
                <PrivateRoute roles={['user']} path="/home" component={Home} />
            </Switch>
        </BrowserRouter>
    </>
    );
};
export default AppRouter;