import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const updateVideoApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.patch(`${apiUrl}/api/v1/videos`, dataParams);
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const createVideoApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.post(`${apiUrl}/api/v1/videos`, dataParams);
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getVideosDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/videos`, {
      params: dataParams
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const deleteVideoDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.delete(`${apiUrl}/api/v1/videos`, {
      params: dataParams
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};
