import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const addOrder = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const orderData = await axios.post(`${apiUrl}/api/v1/order/`, data);
    return orderData;
  } catch (err) {
    throw err;
  }
};

export const addTransportOrder = async (data) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const orderData = await axios.post(`${apiUrl}/api/v1/order/updateTransport`, data);
    return orderData;
  } catch (err) {
    throw err;
  }
};

export const getOrders = async (uid) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const orderData = await axios.get(`${apiUrl}/api/v1/order?userId=${uid}`);
    return orderData;
  } catch (err) {
    throw err;
  }
};

export const getTransporters = async (uid) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const userData = await axios.get(`${apiUrl}/api/v1/getTransportUsers`);
    return userData;
  } catch (err) {
    throw err;
  }
};