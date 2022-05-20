import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const handleEditUrlDataSubmit = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.patch(
      `${apiUrl}/api/v1/analyticsUrl`,
      dataParams
    );
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const handleNewUrlDataSubmit = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.post(
      `${apiUrl}/api/v1/analyticsUrl`,
      dataParams
    );
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getVideosDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/analyticsUrl`, {
      params: dataParams,
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const deleteVideoDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.delete(`${apiUrl}/api/v1/analyticsUrl`, {
      params: dataParams,
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const handleNewModalDataUpdate = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.patch(
      `${apiUrl}/api/v1/analyticsUrl/handleNewModalDataSubmit`,
      dataParams
    );
    return ModelData;
  } catch (err) {
    throw err;
  }
};
export const getGroupApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(
      `${apiUrl}/api/v1/analyticsUrl/getGroupList`,
      {
        params: dataParams,
      }
    );
    return ModelData;
  } catch (err) {
    throw err;
  }
};
