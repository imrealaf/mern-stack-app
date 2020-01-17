import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

import { RequestMethod } from "../types/Request";

/**
 *  Send request method
 */
export const sendRequest = (
  method: RequestMethod,
  url: string,
  data: any = {}
): AxiosPromise => {
  // Request config
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json"
    }
  };

  // If request requires sending data ..
  if (method === "post" || method === "put") {
    config.data = data;
  }

  return axios(config);
};

/**
 *  Set header method
 */
export const setHeader = (key: string, value: string): void => {
  if (value) {
    axios.defaults.headers.common[key] = value;
  }
};

/**
 *  Delete header method
 */
export const deleteHeader = (key: string): void => {
  if (key) {
    delete axios.defaults.headers.common[key];
  }
};
