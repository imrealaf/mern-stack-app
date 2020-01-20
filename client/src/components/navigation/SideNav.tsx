import React, { useEffect } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import defaultPhoto from "../../assets/default-profile-photo.png";
import { IUser } from "../../modules/user";
import { interpolate } from "../../utils";
import { ISidePanelProps, SidePanel } from "../ui/SidePanel";
import { INavigationLink } from "./Navigation";

/**
 *  Props definition
 */
export interface ISideNavProps {
  id?: string;
  panel: ISidePanelProps;
  user: IUser | null;
  mainItems: any;
  bottomItems?: any;
}

const SideNavComponent: React.FC<ISideNavProps> & {
  defaultProps: Partial<ISideNavProps>;
} = ({ id, panel, user, mainItems, bottomItems, children }) => {
  /*
   *  Location api
   */
  const location = useLocation();

  /*
   *  On location change
   */
  useEffect(() => {
    panel.handleClose();
  }, [location]);

  /*
   *  Get items function
   */
  const getItems = () => {
    return mainItems.map((item: INavigationLink, i: number) => {
      return (
        <React.Fragment key={i}>
          <NavLink className="nav-link px-0" to={interpolate(item.path)}>
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  /*
   *  Get generic items
   */
  const getBottomItems = () => {
    return bottomItems.map((item: any, i: number) => {
      return (
        <React.Fragment key={i}>
          <NavLink
            className={`nav-link text-sm text-secondary px-0 py-1`}
            to={interpolate(item.path)}
          >
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  /**
   *  Render
   */
  return (
    <SidePanel id={id} {...panel}>
      {/* Panel header */}
      {user !== null ? (
        <Row className="mb-3 align-items-center">
          <Col xs={3} className="pr-0">
            <img
              className="img-fluid img-circle"
              src={user.profile.photo ? user.profile.photo : defaultPhoto}
              alt={`${user.profile.name}'s profile pic`}
            />
          </Col>
          <Col xs={9} className="pl-3">
            <h6 className="mb-0 font-light lh-1">{`${user.profile.name}`}</h6>
            <small className="text-secondary">{user.email}</small>
          </Col>
        </Row>
      ) : null}

      {/* Panel items */}
      <Nav className="flex-column">{getItems()}</Nav>

      {children}

      {bottomItems.length ? (
        <div className="sidepanel_bottom">
          <Nav className="d-block">{getBottomItems()}</Nav>
        </div>
      ) : null}
    </SidePanel>
  );
};

/**
 *  Default props
 */
SideNavComponent.defaultProps = {
  id: "",
  user: undefined,
  mainItems: [],
  bottomItems: []
};

export const SideNav = SideNavComponent;
