import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Navbar, NavbarProps } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Navigation.scss";

import { SideNav } from ".";
import * as routes from "../../constants/routes";
import { dictionary } from "../../data";
import { genericPages } from "../../data";
import privateNav from "../../data/public/navigation/nav.authenticated.json";
import publicNav from "../../data/public/navigation/nav.json";
import { useLogout, useToggle } from "../../hooks";
import { IUser } from "../../modules/user";
import { Logo } from "../ui";
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
    bg: "gray-900",
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
            <Logo />
          </Link>

          <a
            className="nav-toggle nav-toggle-left nav-toggle-lg text-white"
            onClick={panel.toggle}
          >
            <FontAwesomeIcon className="mr-1" icon={["fas", "bars"]} />
          </a>

          {/* Side nav toggle */}
          {isAuthenticated && user && !loading ? (
            <a
              className="nav-toggle nav-toggle-right nav-toggle-lg text-white"
              onClick={authPanel.toggle}
            >
              <FontAwesomeIcon className="mr-1" icon={["fas", "user-cog"]} />
            </a>
          ) : null}
        </Container>
      </Navbar>

      <SideNav
        user={null}
        mainItems={publicNav}
        panel={sideNavOptions}
        bottomItems={genericPages}
      />

      {/**
       * Side navigation
       */}
      {isAuthenticated && user && !loading ? (
        <SideNav user={user} panel={authPanel} mainItems={privateNav}>
          {user.role === "admin" ? (
            <Link className="nav-link px-0" to="/admin">
              Admin
            </Link>
          ) : null}
          <Button
            variant="outline-dark"
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
