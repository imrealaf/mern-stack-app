import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "../../constants/routes";
import { genericPages } from "../../data";
import { PrivateRoute } from "../hoc";
import {
  AuthSuccess,
  Dashboard,
  Generic,
  Landing,
  Login,
  NotFound,
  ResendVerify,
  SignUp,
  Verify
} from "../pages";

const Routes: React.FC = () => {
  return (
    <Switch>
      {/**
       * Landing
       * @route /
       * @access public
       */}
      <Route exact={true} path={routes.LANDING}>
        <Landing />
      </Route>

      {/**
       * Login
       * @route /login
       * @access public
       */}
      <Route exact={true} path={routes.LOGIN}>
        <Login />
      </Route>

      {/**
       * Sign up
       * @route /sign-up
       * @access public
       */}
      <Route exact={true} path={routes.SIGN_UP}>
        <SignUp />
      </Route>

      {/**
       * Verify user
       * @route /verify/:token
       * @param token (string) - verification token
       * @access public
       */}
      <Route exact={true} path={routes.VERIFY}>
        <Verify />
      </Route>

      {/**
       * Resend verify
       * @route /resend-verify
       * @access public
       */}
      <Route exact={true} path={routes.RESEND_VERIFY}>
        <ResendVerify />
      </Route>

      {/**
       * Auth success callback
       * @route /auth/success/:token
       * @param token (string) - JSON web token
       * @access public
       */}
      <Route exact={true} path={routes.AUTH_SUCCESS}>
        <AuthSuccess />
      </Route>

      {/**
       * Dashboard
       * @route /dashboard
       * @access private
       */}
      <PrivateRoute exact={true} path={routes.DASHBOARD}>
        <Dashboard />
      </PrivateRoute>

      {/**
       * Generic pages
       * @route /{page}
       * @access public
       */}
      {genericPages.map((page: any, i) => {
        return (
          <Route key={i} exact={true} path={page.path}>
            <Generic {...page} />
          </Route>
        );
      })}

      {/**
       * 404 page
       * @access public
       */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
