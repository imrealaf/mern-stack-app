import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";

import config from "../../../constants/config";
import * as routes from "../../../constants/routes";
import { useVerify } from "../../../hooks";
import { IPageProps, Page } from "../../hoc/Page";
import { Preloader } from "../../ui";

const Verify: React.FC<IPageProps> = ({ isAuthenticated }) => {
  /**
   *  Get token from URL params
   */
  const { token } = useParams();

  /**
   *  Verify api
   */
  const verify = useVerify(token);

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
    <Page title="Verify" classes={["is-auth-page"]}>
      <Container className="text-center py-4">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4 text-primary">
              <FontAwesomeIcon
                className="mr-1"
                icon={["fas", "code"]}
                size="1x"
              />{" "}
              <span>{config.appName}</span>
              <small className="d-block text-secondary text-upper text-spaced text-sm mt-2">
                Verify You Account
              </small>
            </h4>
            <Card>
              <Card.Body>
                {verify.pending ? (
                  <div className="py-5">
                    <Preloader
                      show={true}
                      color="primary"
                      text="Verifying your account.."
                    />
                  </div>
                ) : (
                  <React.Fragment>
                    {verify.isVerified ? (
                      <p className="py-5">
                        <strong>Success!</strong> Your account has been verified
                        <br />
                        You can now{" "}
                        <Link to={routes.LOGIN}>
                          <strong>click here</strong>
                        </Link>{" "}
                        to login
                      </p>
                    ) : null}
                    {verify.error ? (
                      <p className="py-5">{verify.error}</p>
                    ) : null}
                  </React.Fragment>
                )}
              </Card.Body>
            </Card>
            {!verify.pending ? (
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

export default connect(mapStateToProps, {})(Verify);
