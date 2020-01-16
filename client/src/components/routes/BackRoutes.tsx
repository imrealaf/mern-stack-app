import React from "react";
import { Switch } from "react-router-dom";

import * as routes from "../../constants/routes";
import { PrivateRoute } from "../hoc";
import { AdminDashboard } from "../pages";

const Routes: React.FC = () => {
  return (
    <Switch>
      {/**
       * Admin Dashboard
       * @route /admin
       * @access public
       */}
      <PrivateRoute exact={true} path={routes.ADMIN_DASHBOARD} admin={true}>
        <AdminDashboard />
      </PrivateRoute>
    </Switch>
  );
};

export default Routes;
