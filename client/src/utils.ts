import moment, { Moment } from "moment";
import sanitizeHtml from "sanitize-html";

import config from "./constants/config";
import * as routes from "./constants/routes";

export const getCurrentRoute = (
  location: any,
  rootName: string = "home"
): string => {
  const route: string = location.pathname.split("/")[1];
  return route === "" ? rootName : route;
};

export const getTransitionDuration = (
  element: HTMLElement
): number | undefined => {
  const style = window.getComputedStyle(element);
  if (!style) {
    return;
  }

  const duration = parseFloat(
    style.getPropertyValue("transition-duration").replace("s", "")
  );
  const delay = style.getPropertyValue("transition-delay")
    ? parseFloat(style.getPropertyValue("transition-delay").replace("s", ""))
    : 0;

  const val = duration + delay;
  return val * 1000;
};

export const onTransitionEnd = (element: HTMLElement, callback: any): void => {
  const duration = getTransitionDuration(element);
  setTimeout(() => {
    callback(element, duration);
  }, duration);
};

export const addBodyClass = (...classes: string[]): void => {
  document.body.classList.add(...classes);
};

export const removeBodyClass = (...classes: string[]): void => {
  document.body.classList.remove(...classes);
};

export const sanitize = (html: string) => {
  return { __html: sanitizeHtml(html, config.sanitizeHtml) };
};

export const getGreetingTime = (currentTime: Moment = moment()): string => {
  if (!currentTime || !currentTime.isValid()) {
    return "Hello";
  }

  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening
  const currentHour = parseFloat(currentTime.format("HH"));

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return "Good afternoon";
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return "Good evening";
  }
  // Between dawn and noon
  return "Good morning";
};

export const getServerBase = () => {
  return process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
};

export const isAuthPage = (location: any) => {
  return (
    location.pathname === routes.LOGIN ||
    location.pathname === routes.SIGN_UP ||
    location.pathname === routes.RESEND_VERIFY ||
    (location.pathname !== "/" &&
      routes.VERIFY.indexOf("/" + location.pathname.split("/")[1]) > -1)
  );
};

export const isAdminPage = (location: any) => {
  return location.pathname.split("/")[1] === "admin";
};
