import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const validateLicenceKey = async (dataParams) => {
  try {
    axios.defaults.headers.authorization =
      "bearer " + sessionStorage.getItem("token");
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/user/validateLicence`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const validateDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callStandardValidateData`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const trainDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callStandardTrainData`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const trainCompleteDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(`${apiUrl}/api/v1/`, dataParams);
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const buildModelStartApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callStandardBuildPipeline`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};
