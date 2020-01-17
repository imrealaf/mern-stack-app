import React from "react";
import { connect } from "react-redux";

import { IPageProps, Page } from "../../hoc/Page";
import { Preloader } from "../../ui";

const AdminDashboard: React.FC<IPageProps> = ({ loading, user }) => {
  return (
    <Page title="Admin - Dashboard" classes={["navbar-is-fixed"]}>
      {!loading && user !== null ? (
        <React.Fragment>
          {/* Page content */}
          <div id="content" className="p-4">
            <h1 className="font-light">Dashboard</h1>
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

export default connect(mapStateToProps, {})(AdminDashboard);
