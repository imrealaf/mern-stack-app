import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Container, Navbar, NavbarProps } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Navigation.scss";

import { SideNav } from ".";
import config from "../../constants/config";
import { privateNav } from "../../constants/navigation";
import * as routes from "../../constants/routes";
import pages from "../../data";
import { useLogout, useToggle } from "../../hooks";
import { IUser } from "../../types/User";

/*
 *  Component name
 */
const compName = "navigation";

/*
 *  Props definition
 */
interface INavigationProps extends NavbarProps {
  shadow: boolean;
  isAuthenticated: boolean;
  user: IUser;
  loading: boolean;
}

const Navigation: React.FC<INavigationProps> & {
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
            <strong>{config.appName}</strong>
          </Link>

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

      {/**
       * Side navigation
       */}
      {isAuthenticated && user && !loading ? (
        <SideNav
          user={user}
          panel={panel}
          mainItems={privateNav}
          bottomItems={pages}
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
Navigation.defaultProps = {
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

export default connect(mapStateToProps, {})(Navigation);
