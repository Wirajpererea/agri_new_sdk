import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const callLoginApi = async (loginData) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const userData = await axios.post(`${apiUrl}/api/v1/auth/login`, loginData);
    return userData;
  } catch (err) {
    throw err;
  }
};

export const callLogOutApi = async (userData) => {
  // const  userData = await axios.post(`${config.api}/api/v1/auth/sign-in`, loginData);
  return true;
};
