export const handleResponse = (response) => {
  if (response?.response?.data) {
    return response.response.data;
  } else {
    return response.data;
  }
};
