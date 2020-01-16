import verifyUser from "./verify-user";
import welcome from "./welcome";

export interface IEmailTemplates {
  verifyUser(data: any): string;
  welcome(data: any): string;
}

export const templates: IEmailTemplates = { verifyUser, welcome };
