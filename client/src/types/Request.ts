export type RequestError = {
  message: string;
  param?: string;
};

export type RequestMethod = "get" | "post" | "put" | "delete";
