import global from "./index";

export default {
  ...global,
  create: {
    userExists: "The email you provided is already assigned to a user",
    successVerify:
      "Thanks for signing up!<br/> We've sent you an email to verify your account before logging in"
  },
  verify: {
    notFound: "We were unable to find a user for this token.",
    alreadyVerified:
      "The user assigned to this token has already been verified",
    verifySuccess: "The account has been verified. You can now log in."
  },
  resendVerify: {
    notFound: "We were unable to find a user with that email"
  }
};
