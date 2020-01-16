import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import config from "../../constants/config";
import { getCurrentRoute, isAdminPage } from "../../utils";

/**
 *  Props definition
 */
export interface IPageProps {
  classes?: string[];
  title?: string;
  descrip?: string;
  isAuthenticated?: boolean;
  user?: any;
  isAdmin?: boolean;
  loading?: boolean;
}

export const Page: React.FC<IPageProps> & {
  defaultProps: Partial<IPageProps>;
} = ({ children, title, descrip, classes }) => {
  /**
   *  Location api
   */
  const location = useLocation();

  /**
   *  Route state ..
   */
  const [currentRoute, setCurrentRoute] = useState(null) as any;

  /**
   *  On route change ..
   */
  useEffect(() => {
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
        titleTemplate={`%s ${config.meta.titleSeperator} ${config.appName}`}
        defaultTitle={config.appName}
      >
        <title>{title ? title : ""}</title>
        {descrip ? <meta name="description" content={descrip} /> : null}
        <body className={className()} data-route={currentRoute} />
      </Helmet>
      {children}
    </React.Fragment>
  );
};

/**
 *  Default props
 */
Page.defaultProps = {
  classes: []
};
