import config from "../constants/config";
import * as routes from "../constants/routes";
import { interpolate } from "../utils";

import auth from "../data/dictionary/auth.dictionary.json";
import global from "../data/dictionary/global.dictionary.json";

export const parseConfigValues = (str: string) => {
  let output = str;
  output = interpolate(str, "{", "}", config);
  return output;
};

export const buildDictionary = (isAdmin: boolean = false) => {
  const src: any = isAdmin
    ? { ...routes, ...global, ...auth }
    : { ...routes, ...global, ...auth };
  const dist: any = {};

  // Loop through all definitions and parse config values
  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      let def = src[key];
      def = parseConfigValues(def);
      dist[key] = def;
    }
  }

  return dist;
};
