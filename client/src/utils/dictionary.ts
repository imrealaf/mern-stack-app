import * as routes from "../constants/routes";
import data from "../data/global/dictionary.json";
import { parseConfigValues } from "../utils";

export const getDictionary = () => {
  return { ...routes, ...data } as any;
};

export const buildDictionary = () => {
  const src = getDictionary();
  const dist = {} as any;

  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      let def = src[key];
      def = parseConfigValues(def);
      dist[key] = def;
    }
  }

  return dist;
};
