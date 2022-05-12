import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const addProducts = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const productsData = await axios.post(`${apiUrl}/api/v1/products/`, data);
    return productsData;
  } catch (err) {
    throw err;
  }
};
export const updateProducts = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const productsData = await axios.post(`${apiUrl}/api/v1/products/update`, data);
    return productsData;
  } catch (err) {
    throw err;
  }
};

export const getProducts = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const productsData = await axios.get(`${apiUrl}/api/v1/products`, {
      params: data,
    });
    return productsData;
  } catch (err) {
    throw err;
  }
};
