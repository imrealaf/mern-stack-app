import React from "react";

import { AdminNavigation } from "./navigation";
import { BackRoutes } from "./routes";

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
        <BackRoutes />
      </main>
    </React.Fragment>
  );
};

export default BackEnd;
