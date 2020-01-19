import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { connect } from "react-redux";

import { getGreetingTime } from "../../../utils";
import { IPageProps, Page } from "../../hoc/Page";
import { Preloader } from "../../ui";

const Dashboard: React.FC<IPageProps> = ({ loading, user }) => {
  return (
    <Page title="Dashboard" classes={["navbar-is-fixed"]}>
      {!loading && user !== null ? (
        <React.Fragment>
          {/* Hero */}
          <Jumbotron fluid={true} className="bg-gray-600 py-5">
            <Container className="text-white">
              <h1>Dashboard</h1>
              <span className="divider bg-primary my-3" />
              <p className="lead mb-0">{`${getGreetingTime()}, ${
                user.profile.name
              }`}</p>
            </Container>
          </Jumbotron>

          {/* Page content */}
          <div id="content" className="py-2">
            <Container />
          </div>
        </React.Fragment>
      ) : (
        <Preloader />
      )}
    </Page>
  );
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { loading, data } = state.user;
  return { loading, user: data };
};

export default connect(mapStateToProps, {})(Dashboard);
