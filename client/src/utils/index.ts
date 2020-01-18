import moment, { Moment } from "moment";
import sanitizeHtml from "sanitize-html";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { buildDictionary } from "../utils/dictionary";

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

export const isAdminPage = (location: any) => {
  return location.pathname.split("/")[1] === "admin";
};

export const classBuilder = (mandatory: string[], conditional: any[]) => {
  const classes = [...mandatory];

  if (conditional && conditional.length) {
    for (const item of conditional) {
      const { condition, value } = item;
      if (condition === true) {
        if (Array.isArray(value)) {
          const [executable, className] = value;
          executable();
          classes.push(className);
        } else {
          classes.push(value);
        }
      }
    }
  }

  return classes;
};

export const extract = (arr: string[]) => {
  const beg = arr[0];
  const end = arr[1];
  const matcher = new RegExp(`${beg}(.*?)${end}`, "gm");

  const normalize = (str: string) => str.slice(beg.length, end.length * -1);

  return (str: any) => {
    const match = str.match(matcher);
    return match ? str.match(matcher).map(normalize) : "";
  };
};

export const interpolate = (
  str: string,
  start: string = "{",
  end: string = "}",
  datasrc: any = buildDictionary()
) => {
  let output = str;
  const extractor = extract([start, end]);
  const vars = extractor(output);
  const data = datasrc as any;

  if (vars.length) {
    for (const key of vars) {
      if (typeof data[key] !== undefined && data[key]) {
        const re = new RegExp(`${start}${key}${end}`, "g");
        output = output.replace(re, data[key]);
        console.log(output);
      }
    }
  }

  return output;
};

export const parseConfigValues = (str: string) => {
  let output = str;
  output = interpolate(str, "{", "}", config);
  return output;
};

export const sanitize = (str: string, parseData: boolean = true) => {
  let output = str;
  if (parseData) output = interpolate(output);
  return { __html: sanitizeHtml(output, config.sanitizeHtml) };
};
