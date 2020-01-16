export default {
  error_401: "User not authorized",
  error_404(thingNotFound: string = "item") {
    return `${thingNotFound.charAt(0).toUpperCase() +
      thingNotFound.slice} does not exist`;
  },
  error_500: "Internal server error",
  delete_success(deleted: string = "item") {
    return `${deleted.charAt(0).toUpperCase() +
      deleted.slice} has been deleted`;
  }
};
