import React from "react";

import "./Admin.scss";

import { AdminNavigation } from "./navigation";
import { AdminRoutes } from "./routes";

/*
 *  Props definition
 */
interface IBackEndProps {
  location: any;
}

const BackEnd: React.FC<IBackEndProps> = ({ location }) => {
  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/**
       * Navigation
       */}
      <AdminNavigation bg="primary" variant="dark" fixed="top" shadow={false} />

      {/**
       * Main
       */}
      <main id="main" role="main">
        <AdminRoutes />
      </main>
    </React.Fragment>
  );
};

export default BackEnd;
