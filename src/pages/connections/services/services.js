import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const updateConnectionApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.post(
      `${apiUrl}/api/v1/updateConnection`,
      dataParams,
    );
    return ModelData;
  } catch (err) {
    throw err;
  }
};
