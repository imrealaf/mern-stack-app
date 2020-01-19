const NAMESPACE = "msb";

export default {
  NAMESPACE,
  META_TITLE_SEPERATOR: "-",
  PRELOAD_TIME: 1500,
  TOKEN_STORAGE_NAME: `${NAMESPACE}_token`,
  HTTP_DELAY: 2000,
  SANITIZE_HTML: {
    allowedAttributes: {
      "*": ["href", "data-*", "alt", "class"]
    },
    allowProtocolRelative: true
  },
  MIN_PASSWORD_LENGTH: 6
};
