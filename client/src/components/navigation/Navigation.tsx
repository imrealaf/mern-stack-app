import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Navbar, NavbarProps } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Navigation.scss";

import { SideNav } from ".";
import { privateNav } from "../../constants/navigation";
import * as routes from "../../constants/routes";
import { dictionary } from "../../data";
import { genericPages } from "../../data";
import { useLogout, useToggle } from "../../hooks";
import { IUser } from "../../modules/user";
import { ISidePanelProps } from "../ui/SidePanel";

/*
 *  Component name
 */
const compName = "navigation";

/*
 *  Nav link definition
 */
export interface INavigationLink {
  id?: string;
  title: string;
  path: string;
}

/*
 *  Props definition
 */
export interface INavigationProps extends NavbarProps {
  shadow: boolean;
  isAuthenticated: boolean;
  user: IUser;
  loading: boolean;
}

export const NavComponent: React.FC<INavigationProps> & {
  defaultProps: Partial<INavigationProps>;
} = ({ isAuthenticated, loading, user, shadow, ...rest }) => {
  /*
   *  Logout api
   */
  const logout = useLogout();

  /*
   *  Panel api
   */
  const panel = useToggle();
  const authPanel = useToggle();

  /*
   *  Main nav config (side panel)
   */
  const sideNavOptions: ISidePanelProps = {
    ...panel,
    position: "left",
    bg: "primary",
    color: "white"
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
          <Link
            to={isAuthenticated ? routes.DASHBOARD : routes.LANDING}
            className="navbar-brand text-white mx-auto"
          >
            <FontAwesomeIcon
              className="mr-1"
              icon={["fas", "code"]}
              size="1x"
            />{" "}
            <strong>{dictionary.APP_NAME}</strong>
          </Link>

          <a
            className="nav-toggle nav-toggle-left nav-toggle-lg text-white"
            onClick={panel.toggle}
          >
            <FontAwesomeIcon className="mr-1" icon={["fas", "bars"]} />
          </a>

          {/* Side nav toggle */}
          {isAuthenticated && user && !loading ? (
            <Navbar.Toggle
              className={rest.variant === "dark" ? "text-white" : "text-dark"}
              aria-controls="sidepanel"
              onClick={panel.toggle}
            />
          ) : null}
        </Container>
      </Navbar>

      <SideNav user={null} panel={sideNavOptions}>
        nav
      </SideNav>

      {/**
       * Side navigation
       */}
      {isAuthenticated && user && !loading ? (
        <SideNav
          user={user}
          panel={authPanel}
          mainItems={privateNav}
          bottomItems={genericPages}
        >
          {user.role === "admin" ? (
            <Link className="nav-link px-0" to="/admin">
              Admin
            </Link>
          ) : null}
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
NavComponent.defaultProps = {
  bg: "dark",
  shadow: true,
  variant: "dark",
  expand: false
};

/**
 *  Map state to props
 */
const mapStateToProps = (state: any) => {
  const { isAuthenticated, loading, data } = state.user;
  return { isAuthenticated, loading, user: data };
};

export const Navigation = connect(mapStateToProps, {})(NavComponent);
