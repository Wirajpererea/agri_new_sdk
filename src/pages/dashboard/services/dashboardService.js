import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const registerUser = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const buildData = await axios.post(
      `${apiUrl}/api/v1/auth/register`,
      dataParams
    );
    return buildData;
  } catch (err) {
    throw err;
  }
};
