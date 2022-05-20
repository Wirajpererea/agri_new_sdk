import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const getDataDictionaryData = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.get(
      `${apiUrl}/api/v1/dictionary`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};