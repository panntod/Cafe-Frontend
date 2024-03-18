import axios from "axios";
import { config, baseURL } from "../config";
import { handleApiError } from "../helpers/Response";

export const fetchAllUsers = async () => {
  try {
    const response = await axios.get(baseURL + "/user/getAllUser", config());
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const findUser = async (keyword) => {
  try {
    const response = await axios.post(
      baseURL + "/user/find",
      { keyword },
      config()
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addUsers = async (data) => {
  try {
    const response = await axios.post(baseURL + "/user/addUser", data, config());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUsers = async (id, data) => {
  try {
    const response = await axios.put(baseURL + `/user/${id}`, data, config());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteUsers = async (userId) => {
  try {
    const response = await axios.delete(baseURL + "/user/" + userId, config());
    return response.data
  } catch (error) {
    return handleApiError(error);
  }
};
