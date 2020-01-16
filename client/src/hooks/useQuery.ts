import { useLocation } from "react-router-dom";

/**
 *  Parse value helper function
 */
const parseValue = (value: any) => {
  let output = value;
  if (value === "true" || value === "TRUE") {
    output = true;
  }
  if (value === "false" || value === "FALSE") {
    output = false;
  }
  if (!isNaN(value)) {
    output = parseInt(value);
  }

  return output;
};

/**
 *  Hook api type
 */
export type IUseQuery = string | null;

/**
 *  Hook
 */
export const useQuery = (key: string): IUseQuery => {
  // Get url params (polyfill has been included for older browsers)
  const params = new URLSearchParams(useLocation().search);

  // Get query
  const query = params.get(key) as string | null;

  // Return result
  return query ? parseValue(decodeURI(query)) : null;
};
