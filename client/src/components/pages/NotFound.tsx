import React from "react";
import { Container } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Page } from "../hoc";

const NotFound: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Page title="Error 404">
      <div id="content" className="mt-5">
        <Container className="py-4 text-center">
          <h1 className="display-4 text-center">404</h1>
          <p>We couldn't find the page {location.pathname}</p>
        </Container>
      </div>
    </Page>
  );
};

export default withRouter(NotFound);
