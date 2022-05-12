import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const getDataDictionaryData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(`${apiUrl}/api/v1/ETL_knowledgebase`, {
      params: dataParams,
    });
    return buildData;
  } catch (err) {
    throw err;
  }
};
export const getAnalyticsData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(`${apiUrl}/api/v1/ETL_knowledgebase/getAnalyticsData`, {
      params: dataParams,
    });
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const getUserModelBuildData = async (dataParams) => {
  try {
    axios.defaults.headers.authorization =
      "bearer " + sessionStorage.getItem("token");
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(
      `${apiUrl}/api/v1/sp/callGetUserModelBuild`,
      {
        params: dataParams,
      }
    );

    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getModelExecutionAvailableApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(
      `${apiUrl}/api/v1/sp/callModelExecutionAvailableStatus`,
      {
        params: dataParams,
      }
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const getPowerBiAccess = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(`${apiUrl}/api/v1/accessPowerBi`, {
      params: dataParams,
    });
    return buildData;
  } catch (err) {
    throw err;
  }
};

export const getEmbedUrl = async (dataParams) => {
  try {
    const buildData = await axios.post(
      `https://api.powerbi.com/v1.0/myorg/groups/${dataParams.workspaceId}/reports/${dataParams.reportId}`,
      {
        params: {
          Authorization: "Bearer " + dataParams.accessToken,
        },
      }
    );
    return buildData;
  } catch (err) {
    console.log(err.response);
    throw err;
  }
};
