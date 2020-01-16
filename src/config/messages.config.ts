export default {
  error400Auth: "Invalid credentials",
  error401: "User not authorized",
  error404(thingNotFound: string = "item") {
    return `${thingNotFound.charAt(0).toUpperCase() +
      thingNotFound.slice} does not exist`;
  },
  error500: "Internal server error",
  successDelete(deleted: string = "item") {
    return `${deleted.charAt(0).toUpperCase() +
      deleted.slice} has been deleted`;
  }
};
