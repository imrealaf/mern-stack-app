import { buildDictionary } from "../utils/dictionary";

import privacy from "./public/pages/privacy.json";
import terms from "./public/pages/terms.json";

/**
 *  Export generic pages
 */
export const genericPages = [privacy, terms];

/**
 *  Generate & dictionary
 */
export const dictionary = buildDictionary();
