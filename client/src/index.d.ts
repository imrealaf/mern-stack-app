declare module "*.json" {
  const value: any;
  export default value;
}

export type ThemeColor =
  | "primary"
  | "secondary"
  | "info"
  | "warning"
  | "success"
  | "danger"
  | "light"
  | "dark";

export type ViewHeight = 25 | 50 | 75 | 100;
