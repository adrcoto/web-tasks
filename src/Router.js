import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Users from './components/Users/Users';
import Login from './components/Auth/Login';
import Register from './components/Register/Register';

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/users" component={Users}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
