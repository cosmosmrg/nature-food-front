import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {HomePage} from '../HomePage'

export const PrivateRoute = ({ component: Component, title, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <HomePage title={title}><Component {...props} /></HomePage>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
