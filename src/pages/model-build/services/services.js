import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const buildModelInitialApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callModelBuildModel`,
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
      `${apiUrl}/api/v1/sp/callModelValidateData`,
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
      `${apiUrl}/api/v1/sp/callModelTrainData`,
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
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callModelTestData`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const buildModelStartApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callModelBuildPipeline`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const buildModelDataLogsApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/sp/callModelBuildLogs`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const getModelTrainStatusApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(
      `${apiUrl}/api/v1/sp/callModelTrainStatus`,
      {
        params: dataParams,
      }
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};


