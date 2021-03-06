import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import PrivateRoute from './Auth/PrivateRoute';

import Home from './Home'
import Login from './Auth/Login';
import Logout from './Auth/Logout';

import ValidatingToken from './Auth/ValidatingToken';
import NotFound from './Error/NotFound';
import PermissionDenied from './Error/PermissionDenied';
import Unauthorized from './Error/Unauthorized';
import Exception from './Error/Exception';


import AdminRoutes from './Admin/AdminRoutes';
import Evaluation from './Evaluation/Evaluation';

export const LOGIN_PATH = '/login';
export const LOGOUT_PATH = '/logout';
export const VALIDATING_TOKEN_PATH = '/validating-token';
export const PERMISSION_DENIED = '/permission-denied';
export const UNAUTHORIZED = '/unauthorized';
export const EXCEPTION_PATH = '/exception';

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>

        {/**
         * System Route
         */}
        <Route exact path={LOGIN_PATH} >
          <Login loginSuccessRoute="/evaluation" />
        </Route>

        <Route path={PERMISSION_DENIED} component={PermissionDenied} />
        <Route path={UNAUTHORIZED} component={Unauthorized} />
        <Route path={EXCEPTION_PATH} component={Exception} />

        <Route path={LOGOUT_PATH} component={Logout} />

        {/**
         * App Route
         */}

        <PrivateRoute roles={['teacher']} exact path="/" unauthorizedPath={LOGIN_PATH}
          component={() => <Redirect to={{ pathname: '/evaluation' }} />} />


        <PrivateRoute roles={['teacher']} path={`/evaluation`} component={Evaluation} />

        {/* <PrivateRoute path={`/admin`} component={Admin} /> */}
        {/* <AdminRoutes prefix='admin' /> */}
        <PrivateRoute path={`/admin`} component={AdminRoutes} />

        {/**
         * Catch all route
         */}
        <Route component={NotFound} />
      </Switch>

    </Router>
  );
}
export default Routes;
