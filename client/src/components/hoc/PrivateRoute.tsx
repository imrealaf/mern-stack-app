import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

import * as routes from "../../constants/routes";

/**
 *  Props definition
 */
interface IPrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  loading: boolean;
  admin?: boolean;
  isAdmin: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({
  isAuthenticated,
  admin,
  isAdmin,
  loading,
  children,
  ...rest
}) => {
  const normalCondition = !isAuthenticated && !loading;
  const adminCondition = !isAdmin && normalCondition;
  const condition = admin ? adminCondition : normalCondition;

  return (
    <Route
      {...rest}
      render={() => (condition ? <Redirect to={routes.LANDING} /> : children)}
    />
  );
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { isAuthenticated, loading, isAdmin } = state.user;
  return { isAuthenticated, loading, isAdmin };
};

export default connect(mapStateToProps)(PrivateRoute);
