import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

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
