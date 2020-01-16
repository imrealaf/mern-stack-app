import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import * as routes from "../../../constants/routes";
import { loginSuccess } from "../../../redux/actions/user.actions";
import { IPageProps } from "../../hoc/Page";

const AuthSuccess: React.FC<IPageProps> = ({ isAuthenticated }) => {
  /**
   *  Load dispatch
   */
  const dispatch = useDispatch();

  /**
   *  Get token from URL params
   */
  const { token } = useParams();

  /**
   *  On mount, dispatch login success with token
   */
  useEffect(() => {
    if (token) {
      dispatch(
        loginSuccess({
          token,
          isAdmin: false
        })
      );
    }
  }, [token]);

  /**
   *  Redirect if authenticated
   */
  if (isAuthenticated) {
    return <Redirect to={routes.DASHBOARD} />;
  }

  return null;
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps, {})(AuthSuccess);
