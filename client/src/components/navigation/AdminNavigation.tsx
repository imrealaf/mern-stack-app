import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./AdminNavigation.scss";

import { SideNav } from ".";
import * as routes from "../../constants/routes";
import { dictionary } from "../../data";
import mainNav from "../../data/admin/navigation/admin.nav.main.json";
import userNav from "../../data/admin/navigation/admin.nav.user.json";
import { useLogout, useToggle } from "../../hooks";
import { ISidePanelProps } from "../ui/SidePanel";
import { INavigationProps } from "./Navigation";

/*
 *  Component name
 */
const compName = "navigation";

const AdminNavigationComponent: React.FC<INavigationProps> & {
  defaultProps: Partial<INavigationProps>;
} = ({ user, shadow, ...rest }) => {
  /*
   *  Logout api
   */
  const logout = useLogout();

  /*
   *  Panel api
   */
  const mainPanel = useToggle();

  /*
   *  Panel api
   */
  const userPanel = useToggle();

  /*
   *  Main nav config (side panel)
   */
  const navPanelOptions: ISidePanelProps = {
    ...mainPanel,
    position: "left",
    onCanvas: true,
    bg: "dark"
  };

  /*
   *  Classes function
   */
  const className = (): string => {
    const classes = [compName];
    if (shadow) classes.push(`${compName}-shadow`);
    return classes.join(" ");
  };

  /*
   *  Render
   */
  return (
    <React.Fragment>
      {/**
       * Navbar
       */}
      <Navbar className={className()} {...rest}>
        <Container fluid={true}>
          {/* Logo */}
          <Link to={routes.ADMIN_DASHBOARD} className="navbar-brand">
            <FontAwesomeIcon
              className="mr-1"
              icon={["fas", "code"]}
              size="1x"
            />{" "}
            <strong>{dictionary.APP_NAME}</strong>
          </Link>

          <button
            className="nav-toggle nav-toggle-left text-white d-lg-none"
            onClick={mainPanel.toggle}
          >
            <FontAwesomeIcon
              className="mr-1"
              icon={["fas", "bars"]}
              size="1x"
            />
          </button>

          <button
            className="nav-toggle nav-toggle-right text-white"
            onClick={userPanel.toggle}
          >
            <FontAwesomeIcon
              className="mr-1"
              icon={["fas", "user-cog"]}
              size="1x"
            />
          </button>
        </Container>
      </Navbar>

      <SideNav
        id="main-nav"
        user={null}
        panel={navPanelOptions}
        mainItems={mainNav}
      />

      {/**
       * Side navigation
       */}
      {user ? (
        <SideNav user={user} panel={userPanel} mainItems={userNav}>
          <Button
            variant="outline-secondary"
            className="btn-pill btn-sm mt-3 px-3"
            onClick={logout}
          >
            Log Out
          </Button>
        </SideNav>
      ) : null}
    </React.Fragment>
  );
};

/*
 *  Default props
 */
AdminNavigationComponent.defaultProps = {
  bg: "dark",
  shadow: true,
  variant: "dark",
  expand: false
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { data } = state.user;
  return { user: data };
};

export const AdminNavigation = connect(
  mapStateToProps,
  {}
)(AdminNavigationComponent);
