import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import Login from './containers/login';
import PrivateRoute from './layouts/PrivateRoute';
import PublicRoute from './layouts/PublicRoute';
import Register from './containers/register/register';
import ResendEmail from './components/ResendEmail/ResendEmail';
import AccountActivation from './containers/account-activation/account-activation';
import PasswordReset from './containers/password-reset';
import RootPage from './layouts/RootPage';
import Policy from './components/policy/Policy';
import PublicPage from './layouts/PublicPage';
import FMA from './containers/login/mfa';

ReactGA.initialize('UA-79885574-5');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newVersionAvailable: false,
            waitingWorker: {},
        };
    }

    componentDidMount = () => {
        // Get and remove any service workers:
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations()
                .then(serviceWorkers => Promise.all(
                    serviceWorkers.map(sw => sw.unregister()),
                ))
                .catch(console.error);
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/register/:referralToken?" component={Register} />
                    <Route path="/account-activation/:token" component={AccountActivation} />
                    <Route path="/account-activation-for-event/:event_id/:token" component={AccountActivation} />
                    <Route path="/password-reset/:token" component={PasswordReset} />
                    <Route path="/activate" component={ResendEmail} />
                    <Route path="/policy" component={Policy} exact />
                    <Route path="/mfa" component={FMA} exact />
                    <PrivateRoute path="/platform" component={RootPage} />
                    <PublicRoute path="/" component={PublicPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
