import axios from "../../../config/axiosInstance";
import configConstants from "../../../config/constants";

export const updateUserApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.patch(`${apiUrl}/api/v1/user`, dataParams);
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const createUserApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.post(`${apiUrl}/api/v1/user`, dataParams);
    return ModelData;
  } catch (err) {
    throw err;
  }
};


export const saveUserRole = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.post(`${apiUrl}/api/v1/user/saveUserRole`, dataParams);
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getUsersDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/user`, {
      params: dataParams
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const deleteUserDataApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.delete(`${apiUrl}/api/v1/user`, {
      params: dataParams
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};

export const getUserRolesApi = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/user/userRoles`, {
      params: dataParams
    });
    return ModelData;
  } catch (err) {
    throw err;
  }
};
export const getUserRoleByUserId = async (dataParams) => {
  try {
    const apiUrl = configConstants.apiUrlWithPort;
    const ModelData = await axios.get(`${apiUrl}/api/v1/user/getUserRolesByUserId`, {
      params: dataParams
    });
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
