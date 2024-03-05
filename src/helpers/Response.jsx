import AuthHelper from "./AuthHelper";

export const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 403) {
      window.location.href = "/forbidden";
    } else if (status === 401) {
      window.location.href = "/notFound";
    }
  }

  console.error(error);
  return error;
};
