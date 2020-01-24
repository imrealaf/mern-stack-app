/**
 *  Has error function
 */
export const hasError = (error: any, name: string = "") => {
  const isError = error !== null;

  if (name) {
    return (
      isError &&
      typeof error.name !== undefined &&
      error.name &&
      error.name === name
    );
  }

  return isError;
};

/**
 *  Get error function
 */
export const getError = (error: any) => {
  return hasError(error) ? error : null;
};
