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


export const AppRouter = () => {
    const {initialized} = useKeycloak();
    if (!initialized) {
        return (
            <div>
                <div className="loadingImgContainer">
                    <img className="loadingImg" src="../resources/images/spinner.svg" />
                </div>
                <div className="loadingText">Loading...</div>
            </div>

        );
    }
    return (<>
        <Navigation />
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Start}/>
                <Route exact path="/guest" component={GuestHome} />
                <PrivateRoute roles={['user']} path="/user" component={UserHome} />
                <PrivateRoute roles={['admin']} path="/admin" component={AdminHome} />
                <Route exact path="/*" component={NotFound}/>
            </Switch>
        </BrowserRouter>
    </>
    );
};
export default AppRouter;