import axios from "axios";
import { baseURL, config } from "../config";
import { handleApiError } from "../helpers/Response";

export const fetchTransaksiKasir = async () => {
  let idUser = localStorage.getItem("id_user");

  try {
    const response = await axios.get(
      baseURL + `/transaksi/find/${idUser}`,
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchAllTransaksi = async () => {
  try {
    const response = await axios.get(
      baseURL + "/transaksi/getTransaksi",
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const addTransaksi = async (data) => {
  try {
    const response = await axios.post(
      baseURL + "/transaksi/addTransaksi",
      data,
      config(),
    );
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateTransaksi = async (id, data) => {
  try {
    const response = await axios.put(
      baseURL + "/transaksi/updateStatus/" + id,
      data,
      config(),
    );
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const findTransaksi = async (seacrh) => {
  try {
    const response = await axios.post(
      baseURL + "/transaksi/find",
      { keyword: seacrh },
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const filterTransaksi = async (startDate, endDate) => {
  try {
    const response = await axios.post(
      baseURL + "/transaksi/filterTransaksi",
      {
        startDate,
        endDate,
      },
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const topSellingMenu = async () => {
  try {
    const response = await axios.get(
      baseURL + "/transaksi/topSellingMenu",
      config(),
    );
    return response.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteTransaksi = async (id) => {
  try {
    const response = await axios.delete(baseURL + `/transaksi/${id}`, config());
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
