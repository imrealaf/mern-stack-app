import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as routes from "../../../constants/routes";
import { useSignUp } from "../../../hooks";
import { SignUpForm } from "../../auth";
import { IPageProps, Page } from "../../hoc/Page";
import { Logo } from "../../ui";

const SignUp: React.FC<IPageProps> = ({ isAuthenticated }) => {
  /**
   *  Sign up api
   */
  const signUp = useSignUp();

  /**
   *  Redirect if authenticated
   */
  if (isAuthenticated) {
    return <Redirect to={routes.DASHBOARD} />;
  }

  return (
    <Page title="Sign Up" classes={["is-auth-page"]}>
      <Container className="text-center py-2">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4 text-primary">
              <Logo color="primary" />
              <small className="d-block text-secondary text-upper text-spaced text-sm mt-2">
                Sign Up
              </small>
            </h4>
            <Card>
              <Card.Body>
                <SignUpForm signUp={signUp} />
              </Card.Body>
            </Card>
            {!signUp.pending ? (
              <div className="mt-3 pb-4">
                <Link to={routes.LANDING}>
                  <small>Back to site</small>
                </Link>
              </div>
            ) : null}
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { isAuthenticated } = state.user;
  return { isAuthenticated };
};

export default connect(mapStateToProps, {})(SignUp);
