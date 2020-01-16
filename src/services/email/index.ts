import sg from "@sendgrid/mail";

import env from "../../env";
import { IEmailTemplates, templates } from "./templates";

/**
 *  Email config interface
 */
export interface IEmailConfig {
  fromEmail: string;
  fromName: string;
}

/**
 *  Email service interface
 */
export interface IEmailService {
  client: any;
  config: IEmailConfig;
  templates: IEmailTemplates;
  template(name: string, data: any): string;
  send(options: any): void;
}

/**
 *  Email configuration
 */
export const config: IEmailConfig = {
  fromEmail: env.get("EMAIL_FROM_EMAIL"),
  fromName: env.get("EMAIL_FROM_NAME")
};

/**
 *  Set SendGrid API key
 */
sg.setApiKey(env.get("EMAIL_API_KEY"));

/**
 *  Email service class
 */
class EmailService implements IEmailService {
  public client: any;
  public config: IEmailConfig;
  public templates: any;

  /**
   *  Constructor
   */
  constructor(client: any, conf: IEmailConfig, templ: IEmailTemplates) {
    this.client = client;
    this.config = conf;
    this.templates = templ;
  }

  /**
   *  Template
   */
  public template(name: string, data: any = null): string {
    return name && this.templates[name] ? this.templates[name](data) : "";
  }

  /**
   *  Send
   */
  public send(options: any) {
    const message = {
      from: {
        name: this.config.fromName,
        email: this.config.fromEmail
      },
      ...options
    };
    return this.client.send(message);
  }
}

// Export service
export const emailService = new EmailService(sg, config, templates);
