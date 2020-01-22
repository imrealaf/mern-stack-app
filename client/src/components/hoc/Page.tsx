import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import "./Page.scss";

import config from "../../constants/config";
import { dictionary } from "../../data";
import { IUser } from "../../modules/user";
import { getCurrentRoute, isAdminPage } from "../../utils";

/**
 *  Props definition
 */
export interface IPageProps {
  classes?: string[];
  title?: string;
  description?: string;
  content?: string;
  path?: string;
  isAuthenticated?: boolean;
  user?: IUser;
  isAdmin?: boolean;
  loading?: boolean;
}

export const Page: React.FC<IPageProps> & {
  defaultProps: Partial<IPageProps>;
} = ({ children, title, description, classes }) => {
  /**
   *  Location api
   */
  const location = useLocation();

  /**
   *  State ..
   */
  const [show, setShow] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null) as any;

  /**
   *  On route change ..
   */
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);
    setCurrentRoute(getCurrentRoute(location, "landing"));
  }, [location, setCurrentRoute]);

  /**
   *  Class string generation
   */
  const className = () => {
    const classArray = [] as any;
    if (!classes) classes = [];
    if (isAdminPage(location)) classes.push("is-admin-page");
    return classArray.concat(classes).join(" ");
  };

  /**
   *  Render
   */
  return (
    <React.Fragment>
      <Helmet
        titleTemplate={`%s ${config.META_TITLE_SEPERATOR} ${dictionary.APP_NAME}`}
        defaultTitle={dictionary.APP_NAME}
      >
        <title>{title ? title : ""}</title>
        {description ? <meta name="description" content={description} /> : null}
        <body className={className()} data-route={currentRoute} />
      </Helmet>
      <div className={`page${show ? " in" : ""}`}>{children}</div>
    </React.Fragment>
  );
};

/**
 *  Default props
 */
Page.defaultProps = {
  classes: [],
  title: "",
  description: "",
  content: "",
  path: ""
};
