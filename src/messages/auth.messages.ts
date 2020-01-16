import global from "./index";

export default {
  ...global,
  email: {
    invalid: "Invalid credentials",
    verify: `You must verify your account before logging in.`
  },
  verify: {
    notFound: "We were unable to find a user for this token.",
    alreadyVerified:
      "The user assigned to this token has already been verified",
    verifySuccess: "The account has been verified. You can now log in."
  },
  resendVerify: {
    notFound: "We were unable to find a user with that email"
  },
  social: {
    emailExists(provider: string) {
      return `Your ${provider} account email is already assigned to a user in our system`;
    }
  }
};
