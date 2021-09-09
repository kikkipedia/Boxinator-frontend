import { useKeycloak } from '@react-keycloak/web';

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminMain from './components/admin/AdminMain';
import Home from './components/home/Home'
import UserMain from './components/user/UserMain'
import Start from './components/start/Start'
import { PrivateRoute } from './utilities/privateRoute';
import Navigation from './components/shared/Navigation'


export const AppRouter = () => {
    const { keycloak,initialized} = useKeycloak();
    if (!initialized) {
        return <h3>Loading ... !!!</h3>;
    }
    return (<>
        
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/start" component={Start}/>
                <Route path="/user" component={UserMain}/>
                <PrivateRoute roles={['admin']} path="/admin" component={AdminMain} />
            </Switch>
        </BrowserRouter>
    </>
    );
};
export default AppRouter;