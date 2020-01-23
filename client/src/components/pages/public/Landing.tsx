import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./Landing.scss";

import * as routes from "../../../constants/routes";
import data from "../../../data/public/pages/landing.json";
import { sanitize } from "../../../utils";

import { IPageProps, Page } from "../../hoc/Page";
import { Hero } from "../../ui";

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
    <Page description="This is the home page">
      {/* Hero */}
      <Hero image={data.image} vh={100} overlay={true} overlayOpacity={0.7}>
        <div className="text-center text-white">
          <h1
            className="display-3"
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
              className="btn bg-white text-dark btn-pill btn-lg ml-3"
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
