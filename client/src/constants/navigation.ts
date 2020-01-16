/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

import * as routes from "./routes";

export const publicNav = [
  {
    title: "Something",
    path: ""
  }
];

export const privateNav = [
  {
    title: "Dashboard",
    path: routes.DASHBOARD
  }
];

export const adminNav = [
  {
    title: "Dashboard",
    path: routes.ADMIN_DASHBOARD
  },
  {
    title: "Users",
    path: routes.ADMIN_USERS
  }
];

export const adminUserNav = [
  {
    title: "My Account",
    path: routes.ADMIN_DASHBOARD
  },
  {
    title: "View Website",
    path: routes.LANDING
  }
];
