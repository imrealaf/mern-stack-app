const NAMESPACE = "msb";

export default {
  appName: "MERN Stack App",
  namespace: NAMESPACE,
  meta: {
    titleSeperator: "-"
  },
  preload: {
    delayTime: 1500
  },
  apiBase: "/api",
  auth: {
    minPasswordLength: 6,
    validationErrors() {
      return {
        usernameValidEmail: "Not a valid email",
        passwordMinLength: `Password must be at least ${this.minPasswordLength} chars`,
        passwordMatch: `Confirmed password must match the above`
      };
    },
    tokenStorageName: `${NAMESPACE}_token`
  },
  http: {
    requestDelay: 2000,
    responseDelay: 0
  },
  sanitizeHtml: {
    allowedAttributes: {
      "*": ["href", "data-*", "alt", "class"]
    },
    allowProtocolRelative: true
  }
};
