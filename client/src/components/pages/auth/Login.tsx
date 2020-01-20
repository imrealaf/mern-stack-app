import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as routes from "../../../constants/routes";
import { useLogin } from "../../../hooks";
import { LoginForm } from "../../auth";
import { IPageProps, Page } from "../../hoc/Page";
import { Logo } from "../../ui";

const Login: React.FC<IPageProps> = ({ isAuthenticated }) => {
  /**
   *  Login api
   */
  const login = useLogin();

  /**
   *  Redirect if authenticated
   */
  if (isAuthenticated) {
    return <Redirect to={routes.DASHBOARD} />;
  }

  /**
   *  Render
   */
  return (
    <Page title="Login" classes={["is-auth-page"]}>
      <Container className="text-center py-4">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4">
              <Logo color="dark" />
              <small className="d-block text-secondary text-upper text-spaced text-sm mt-2">
                Login
              </small>
            </h4>
            <Card>
              <Card.Body>
                <LoginForm login={login} />
              </Card.Body>
            </Card>
            {!login.pending ? (
              <div className="mt-3">
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

export default connect(mapStateToProps, {})(Login);
