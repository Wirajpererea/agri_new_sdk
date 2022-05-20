import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const getSystemParameter = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(
      `${apiUrl}/api/v1/systemParameter`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const addSystemParameter = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/systemParameter`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const updateSystemParameter = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.patch(
      `${apiUrl}/api/v1/systemParameter`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const deleteSystemParameter = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.delete(`${apiUrl}/api/v1/systemParameter`, {
      params: dataParams,
    });
    return buildData;
  } catch (err) {
    throw err;
  }
};
