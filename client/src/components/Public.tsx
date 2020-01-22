import React from "react";

import * as routes from "../constants/routes";
import { isAuthPage } from "../utils/auth";
import { Navigation } from "./navigation";
import { PublicRoutes } from "./routes";
import { LoadImages } from "./ui";

/*
 *  Props definition
 */
interface IFrontEndProps {
  location: any;
}

const FrontEnd: React.FC<IFrontEndProps> = ({ location }) => {
  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/**
       * Navigation
       */}
      {isAuthPage(location) ? null : (
        <Navigation
          shadow={location.pathname === routes.LANDING ? false : true}
          bg="primary"
          variant="dark"
          fixed="top"
        />
      )}

      {/**
       * Main
       */}
      <main id="main" role="main">
        <PublicRoutes />
      </main>

      {/**
       * Preload images
       */}
      <LoadImages images={["/images/landing.jpg"]} />
    </React.Fragment>
  );
};

export default FrontEnd;
