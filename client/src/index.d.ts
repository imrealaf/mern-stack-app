declare module "*.json" {
  const value: any;
  export default value;
}

export declare type ThemeColor =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "success"
  | "danger"
  | "light"
  | "dark"
  | "black"
  | "white"
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800"
  | "gray-900";

export declare type Size = "xs" | "sm" | "md" | "lg" | "xl";

export declare type ViewHeight = 25 | 50 | 75 | 100;
