import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import * as routes from "../../../constants/routes";
import data from "../../../data/landing";
import { sanitize } from "../../../utils";

import { IPageProps, Page } from "../../hoc/Page";
import { Hero } from "../../ui";

import heroImage from "../../../assets/landing.jpg";

const Landing: React.FC<IPageProps> = ({ isAuthenticated }) => {
  /**
   *  Redirect if not authenticated
   */
  if (isAuthenticated) {
    return <Redirect to={routes.DASHBOARD} />;
  }

  /**
   *  Render
   */
  return (
    <Page descrip="This is the home page">
      {/* Hero */}
      <Hero image={heroImage} vh={100} overlay={true} overlayOpacity={0.8}>
        <div className="text-center text-white">
          <h1
            className="display-4"
            dangerouslySetInnerHTML={sanitize(data.heading)}
          />
          <h5
            className="font-light mt-3"
            dangerouslySetInnerHTML={sanitize(data.subheading)}
          />
          <div className="mt-5">
            <Link
              to={routes.SIGN_UP}
              className="btn btn-primary btn-pill btn-lg"
            >
              <strong>Sign Up</strong>
            </Link>
            <Link
              to={routes.LOGIN}
              className="btn btn-secondary btn-pill btn-lg ml-3"
            >
              Log In
            </Link>
          </div>
        </div>
      </Hero>
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

export default connect(mapStateToProps, {})(Landing);
