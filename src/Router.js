import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/Password/ForgotPassword';
import ChangePassword from './components/Password/ResetPassword';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/users" component={Users}/>
                    <Route exact path="/forgot-password" component={ForgotPassword}/>
                    <Route exact path="/change-password" component={ChangePassword}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
