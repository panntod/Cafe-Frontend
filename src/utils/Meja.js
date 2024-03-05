import axios from "axios";
import { config, baseURL } from "../config";
import { handleApiError } from "../helpers/Response";

export const fetchAllMejas = async () => {
  try {
    const response = await axios.get(baseURL + "/meja/getAllMeja", config);
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const findMejas = async (keyword) => {
  try {
    const response = await axios.post(
      baseURL + "/meja/find",
      { keyword },
      config
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addMeja = async (data) => {
  try {
    const response = await axios.post(baseURL + "/meja/addMeja", data, config);
    return response.data
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateMeja = async (id, data) => {
  try {
    const response = await axios.put(baseURL + `/meja/${id}`, data, config);
    return response.data
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteMeja = async (MejaId) => {
  try {
    const response = await axios.delete(baseURL + "/meja/" + MejaId, config);
    return response.data
  } catch (error) {
    return handleApiError(error);
  }
};

export const mejaKosong = async () => {
  try {
    return await axios.get(baseURL + "/meja/status/kosong", config);
  } catch (error) {
    return handleApiError(error);
  }
};
