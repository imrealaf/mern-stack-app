import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { userActions } from "../modules/user";
import { isAdminPage } from "../utils";
import { Admin, Public } from "./";
import { Logo, Preload } from "./ui";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  /*
   *  Add font awesome icons to library
   */
  library.add(fas, fab);

  /*
   *  On mount, try to get current user ..
   */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.getCurrentUser());
  }, []);

  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/**
       * Preload
       */}
      <Preload animateOut={true} color="primary">
        <Logo text={false} size="xl" />
      </Preload>

      {/**
       * Determine which app to load
       */}
      {isAdminPage(location) ? (
        <Admin location={location} />
      ) : (
        <Public location={location} />
      )}
    </React.Fragment>
  );
};

export default withRouter(App);
