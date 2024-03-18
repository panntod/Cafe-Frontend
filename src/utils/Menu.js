import axios from "axios";
import { baseURL, config } from "../config";
import { handleApiError } from "../helpers/Response";

export const fetchAllMenu = async () => {
  try {
    const response = await axios.get(baseURL + "/menu/getAllMenu", config());
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const findMenu = async (keyword) => {
  try {
    const response = await axios.post(
      baseURL + "/menu/find",
      { keyword: keyword },
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addMenu = async (data) => {
  try {
    const response = await axios.post(
      baseURL + "/menu/addMenu",
      data,
      config(),
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateMenu = async (id, data) => {
  try {
    const response = await axios.put(baseURL + "/menu/" + id, data, config());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteMenu = async (id) => {
  try {
    const response = await axios.delete(baseURL + "/menu/" + id, config());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
