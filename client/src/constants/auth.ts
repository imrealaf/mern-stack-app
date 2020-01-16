import * as routes from "./routes";

export default {
  socialProviders: [
    {
      id: "facebook",
      icon: "facebook-f",
      title: "Facebook",
      path: routes.AUTH_FACEBOOK
    },
    {
      id: "google",
      icon: "google",
      title: "Google",
      path: routes.AUTH_GOOGLE
    }
    // {
    //   id: "linkedin",
    //   icon: "linkedin-in",
    //   title: "LinkedIn",
    //   path: routes.AUTH_LINKEDIN
    // }
    // {
    //   id: "apple",
    //   icon: "apple",
    //   title: "Apple",
    //   path: routes.AUTH_APPLE
    // }
  ]
};
